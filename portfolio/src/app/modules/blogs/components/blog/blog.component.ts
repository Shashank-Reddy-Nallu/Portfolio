import { Component, VERSION } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { MermaidAPI } from 'ngx-markdown';
import { BlogHeaderComponent } from '../shared/blog-header/blog-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Blog } from '../../../../shared/models/blog.model';
import { BlogHeader } from '../../../../shared/models/blog-header.model';
import { BlogService } from '../../../../shared/services/blog.service';
import { DatePipe, NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SeoService } from '../../../../shared/services/seo.service';
import { SectionTitlesComponent } from '../shared/section-titles/section-titles.component';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, DatePipe, BlogHeaderComponent, MarkdownComponent, SectionTitlesComponent, NgClass],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  // angularVersion = VERSION.full;
  // markdownFilePath = './d/d.md';
  // markdownFilePath = './blogs/multiple-layouts-in-angular.md';
  // markdownContent: any;
  options: MermaidAPI.MermaidConfig = {
    darkMode: true,
    look: 'handDrawn'
  };
  currentBlog: Blog | null = null;
  currentBlogHeader!: BlogHeader;
  suggestedBlogs: Blog[] | undefined | null = [];
  private attachSectionIdsRafId: number | null = null;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly blogService: BlogService, private readonly titleService: Title, private readonly seoService: SeoService, private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const blogId = params['id'] ?? null;
      const blogTitle = params['blog'] ? decodeURIComponent(params['blog']) : null;

      if (!blogId && !blogTitle) {
        console.warn('No blog data found, redirecting...');
        // Redirect if no data found
        this.router.navigate(['/blogs']);
      }
      else if (blogTitle) {
        this.blogService.getBlogByTitle(blogTitle).subscribe({
          next: (blog) => {
            if (blog) {
              this.setBlogData(blog);
            } else {
              console.error('Blog not found');
              this.router.navigate(['/blogs']);
            }
          },
          error: (err) => {
            console.error('Error fetching blog:', err);
            this.router.navigate(['/blogs']);
          }
        })
      }
      else if (blogId) {
        this.blogService.getBlogById(blogId).subscribe({
          next: (blog) => {
            if (blog) {
              this.setBlogData(blog);
            } else {
              console.error('Blog not found');
              this.router.navigate(['/blogs']);
            }
          },
          error: (err) => {
            console.error('Error fetching blog:', err);
            this.router.navigate(['/blogs']);
          }
        });
      }

    });
  }

  private setSuggestedBlogs(excludedBlogId: string): void {
    this.blogService.getSuggestedBlogs(excludedBlogId).subscribe({
      next: (data) => {
        if (data.length) {
          this.suggestedBlogs = data;
        }
      },
      error: (error) => {
        console.error('Error fetching suggested blogs:', error);
      }
    });
  }

  private setBlogData(blog: Blog): void {
    this.currentBlog = blog;
    this.currentBlogHeader = {
      displayTitle: blog.displayTitle,
      readTime: blog.readTime,
      publishedOn: blog.publishedOn,
      bannerUrl: blog.bannerUrl
    };
    this.titleService.setTitle(blog.queryTitle?.replace(/\b\w/g, char => char.toUpperCase()));
    this.setSuggestedBlogs(blog.blogId);

    // Update SEO
    this.seoService.updateMetaTags(blog.queryTitle, `${blog.category}, ${blog.title}, ${blog.queryTitle}, ${blog.displayTitle}, ${blog.description}, blogs, shashank reddy nallu blog, blog, shashank blog, shashank reddy blog, Shashank Blog, Shashank blog, Shashank Reddy blog, Shashank Reddy Blog, Shashank Reddy Nallu Blog`);
    this.seoService.updateSocialMetaTags(blog.queryTitle, blog.description, blog.bannerUrl);
  }
  
  scrollToTop(): void {
    document.getElementById('main-content')?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onMarkdownReady(): void {
    this.scheduleAttachSectionIdsToMarkdownHeadings();
  }

  private scheduleAttachSectionIdsToMarkdownHeadings(): void {
    if (this.attachSectionIdsRafId !== null) {
      cancelAnimationFrame(this.attachSectionIdsRafId);
    }

    // `ready` can fire before the browser has finished a layout pass for the markdown.
    // Scheduling on the next frame makes this deterministic without relying on timeouts.
    this.attachSectionIdsRafId = requestAnimationFrame(() => {
      this.attachSectionIdsRafId = null;
      this.attachSectionIdsToMarkdownHeadings();
    });
  }

  private attachSectionIdsToMarkdownHeadings(): void {
    const sectionTitles = this.currentBlog?.sectionTitles ?? [];
    if (!sectionTitles.length) {
      return;
    }

    const headings = this.getMarkdownHeadings();
    if (!headings.length) {
      return;
    }

    const normalizedHeadings = headings.map(heading => ({
      el: heading,
      normalizedText: this.normalizeHeadingText(heading.textContent ?? '')
    }));

    sectionTitles.forEach((sectionTitle, index) => {
      const domId = sectionTitle.domId ?? '';
      if (!domId) {
        return;
      }

      if (document.getElementById(domId)) {
        return;
      }

      const normalizedLabel = this.normalizeHeadingText(sectionTitle.label);
      const labelMatch = normalizedHeadings.find(h => h.normalizedText.includes(normalizedLabel))?.el ?? null;
      const fallback = headings[index] ?? null;
      const target = labelMatch ?? fallback;

      this.setHeadingId(target, domId);
    });
  }

  private getMarkdownHeadings(): HTMLElement[] {
    // Highest-priority-only heading collection.
    // If the markdown has any h1, we ONLY consider h1 headings.
    // Otherwise, we consider only h2, then only h3, ... down to h6.
    // This avoids mixing levels, which can cause incorrect domId mapping/navigation.
    const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    for (const level of levels) {
      const els = Array.from(document.querySelectorAll(`markdown ${level}`)) as HTMLElement[];
      if (els.length) {
        return els;
      }
    }
    return [];
  }

  private setHeadingId(target: HTMLElement | null, domId: string): void {
    if (!target || !domId) {
      return;
    }
    target.id = domId;
  }

  private normalizeHeadingText(value: string): string {
    return value.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ');
  }

  onBlogClick(blog: Blog): void {
    this.router.navigate(['/blogs/read'], {
      queryParams: {
        // id: blog.blogId, 
        blog: encodeURIComponent(blog.queryTitle.toLowerCase())
      }
    });
    this.scrollToTop();
  }

  // ngOnInit() {
  //   this.http.get(this.markdownFilePath, { responseType: 'text' }).subscribe((content: any) => {
  //     // console.log(content);

  //     this.markdownContent = content;
  //   });
  // }
}