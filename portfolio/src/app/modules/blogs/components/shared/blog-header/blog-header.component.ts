import { Component, Input } from '@angular/core';
import { BlogHeader } from '../../../../../shared/models/blog-header.model';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'blog-header',
  imports: [DatePipe, NgIf],
  templateUrl: './blog-header.component.html',
  styleUrl: './blog-header.component.scss'
})
export class BlogHeaderComponent {
  @Input() blogHeader!: BlogHeader;

  extractTitleParts(title: string): { highlighted: string; remaining: string } {
    const match = title.match(/<([^>]+)>/);
    const highlighted = match ? match[1] : '';
    const remaining = title.replace(/<[^>]+>/, '').trim();
    return { highlighted, remaining };
  }  
}