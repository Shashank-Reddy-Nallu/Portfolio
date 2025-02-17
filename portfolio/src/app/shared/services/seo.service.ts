import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private metaService = inject(Meta);

  updateMetaTags(description: string, keywords: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

  updateSocialMetaTags(title: string, description: string, imageUrl: string): void {
    const url: string = window.location.href;
    let baseUrl: string = window.location.origin;
    if (!baseUrl || !baseUrl.startsWith("https://")) {
      baseUrl = "https://shashankreddy.in";
    }
    const bannerUrl: string = imageUrl.replace(/^\.\/?/, baseUrl + '/');
    
    // Open Graph Meta Tags
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: bannerUrl });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card Meta Tags
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: bannerUrl });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }
}