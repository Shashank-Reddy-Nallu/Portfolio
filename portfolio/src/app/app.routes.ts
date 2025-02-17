import { Routes } from '@angular/router';
import { PageLayout } from './layouts/enums/page-layout.enum';
import { setLayout } from './layouts/utilities/layout-resolver';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.routes').then((m) => m.HOME_ROUTES),
        // canActivate: [AuthGuard],
        resolve: {
            layout: setLayout(PageLayout.Authorized)
        }
    },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'about',
        loadChildren: () => import('./modules/about/about.routes').then((m) => m.ABOUT_ROUTES),
        resolve: {
            layout: setLayout(PageLayout.Authorized)
        }
    },
    {
        path: 'portfolio',
        loadChildren: () => import('./modules/portfolio/portfolio.routes').then((m) => m.PORTFOLIO_ROUTES),
        resolve: {
            layout: setLayout(PageLayout.Authorized)
        }
    },
    {
        path: 'blogs',
        loadChildren: () => import('./modules/blogs/blogs.routes').then((m) => m.BLOGS_ROUTES),
        resolve: {
            layout: setLayout(PageLayout.Authorized)
        }
    },
    {
        path: 'contact',
        loadChildren: () => import('./modules/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
        resolve: {
            layout: setLayout(PageLayout.Authorized)
        }
    },
    {
        path: '**',
        loadComponent: () => import('./layouts/components/error-layout/error-layout.component').then((c) => c.ErrorLayoutComponent),
        resolve: {
            layout: setLayout(PageLayout.Error)
        }
    }
];
