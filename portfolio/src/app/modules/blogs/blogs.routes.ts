import { Routes } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogComponent } from './components/blog/blog.component';

export const BLOGS_ROUTES: Routes = [
    {
        path: '', component: BlogsComponent, title: 'Blogs'
    },
    {
        path: 'read', component: BlogComponent
    }
];