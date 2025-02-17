import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private jsonUrl = './constants/blogs.json';

  constructor(private readonly http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.jsonUrl).pipe(
      map(blogs => 
        blogs.map(blog => ({
          ...blog,
          publishedOn: new Date(blog.publishedOn) // Convert string to Date object
        }))
      )
    );
  }

  getBlogsCount(): Observable<number> {
    return this.getBlogs().pipe(
      map(blogs => blogs.length)
    );
  }

  getBlogById(id: string): Observable<Blog | undefined> {
    return this.getBlogs().pipe(
      map(blogs => blogs?.find(blog => blog.blogId === id))
    );
  }

  getBlogByTitle(title: string): Observable<Blog | undefined> {
    return this.getBlogs().pipe(
      map(blogs => blogs?.find(blog => blog.queryTitle.toLowerCase() === title.toLowerCase()))
    );
  }

  getSuggestedBlogs(excludedBlogId: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.jsonUrl).pipe(
      map(blogs => {
        const data = blogs.map(blog => ({
          ...blog,
          publishedOn: new Date(blog.publishedOn) // Convert string to Date object
        }));

        const filteredBlogs = data.filter(blog => blog.blogId !== excludedBlogId);

        const sortedBlogs = filteredBlogs.sort((a, b) => {
          // Primary sort: Descending by likes
          if (b.likes !== a.likes) {
            return b.likes - a.likes;
          }
          // Secondary sort: Alphabetically by title (ascending)
          return a.title.localeCompare(b.title);
        });

        // Get top 3 blogs
        return sortedBlogs.slice(0, 3);
      })
    );
  }
}