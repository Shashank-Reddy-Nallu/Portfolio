import { NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'authorized-layout',
    imports: [RouterLink],
    templateUrl: './authorized-layout.component.html',
    styleUrl: './authorized-layout.component.scss'
})
export class AuthorizedLayoutComponent {
  @ViewChild('navBar') navBar!: ElementRef;
  @ViewChild('mainContent') mainContent!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any): void {
    this.setNavBarHeight();
  }

  ngAfterViewInit() {
    this.setNavBarHeight();
  }

  setNavBarHeight() {
    if(this.navBar) {
      const navBarHeight = this.navBar.nativeElement.clientHeight;
      this.mainContent.nativeElement.style.height = 'calc(100vh - ' + navBarHeight + 'px)';
      this.mainContent.nativeElement.style.height = 'calc(100svh - ' + navBarHeight + 'px)';
    }
  }
}
