import { Component, VERSION } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { MermaidAPI } from 'ngx-markdown';
import { BlogHeaderComponent } from '../shared/blog-header/blog-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Blog } from '../../../../shared/models/blog.model';
import { BlogHeader } from '../../../../shared/models/blog-header.model';
import { BlogService } from '../../../../shared/services/blog.service';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SeoService } from '../../../../shared/services/seo.service';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, DatePipe, BlogHeaderComponent, MarkdownComponent],
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