import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../../shared/services/blog.service';
import { Blog } from '../../../../shared/models/blog.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-blogs',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './blogs.component.html',
    styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
    blogs: Blog[] | undefined | null = [];
    isDataFetched: boolean = false;
    
    constructor(private readonly router: Router, private readonly blogService: BlogService) { }

    ngOnInit(): void {
        this.blogService.getBlogs().subscribe({
            next: (data) => {
                if (data?.length) {
                    this.blogs = data.sort((a, b) => {
                        // Primary sort: Descending by likes
                        if (b.likes !== a.likes) {
                            return b.likes - a.likes;
                        }
                        // Secondary sort: Alphabetically by title (ascending)
                        return a.title.localeCompare(b.title);
                    });
                }
            },
            error: (error) => {
                console.error('Error fetching blogs:', error);
            },
            complete: () => {
                this.isDataFetched = true;
                if (!this.blogs?.length) {
                    console.warn('No blog data found !!');
                }
            }
        });
    }
    
    onBlogClick(blog: Blog): void {
        this.router.navigate(['/blogs/read'], { 
            queryParams: { 
                // id: blog.blogId, 
                blog: encodeURIComponent(blog.queryTitle.toLowerCase())
            } 
        });
    }
}
