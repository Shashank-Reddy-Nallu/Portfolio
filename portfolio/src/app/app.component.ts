import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayout } from './layouts/enums/page-layout.enum';
import { PageLayoutService } from './layouts/services/page-layout.service';
import { AuthorizedLayoutComponent } from './layouts/components/authorized-layout/authorized-layout.component';
import { ErrorLayoutComponent } from './layouts/components/error-layout/error-layout.component';
import { EmptyLayoutComponent } from './layouts/components/empty-layout/empty-layout.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, AuthorizedLayoutComponent, ErrorLayoutComponent, EmptyLayoutComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  readonly PageLayout = PageLayout;

  constructor(public pageLayoutService: PageLayoutService) { }

  onActivate(): void {
    document.getElementById('main-content')?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
