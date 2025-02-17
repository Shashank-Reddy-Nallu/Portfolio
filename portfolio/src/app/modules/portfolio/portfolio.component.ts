import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';
import { SeoService } from '../../shared/services/seo.service';

interface IWorkData {
    imageUrl: string;
    altText: string;
    title: string;
    description: string;
}

interface ITestimonialData extends IWorkData {
    date: string;
}

@Component({
    selector: 'portfolio',
    standalone: true,
    imports: [CommonModule, ClickOutsideDirective],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
    myWorkData!: IWorkData[];
    testimonialData!: ITestimonialData[];
    activeTestimonialData!: ITestimonialData | null | undefined;
    isModalOpen!: boolean;

    constructor(private readonly router: Router, private readonly seoService: SeoService) {
        this.seoService.updateMetaTags("Shashank Work", "my work, work, Work, Shashank Work, Shashank Portfolio, shashank reddy portfolio, shashank work samples, shashank reddy work samples");

        this.myWorkData = [
            {
                imageUrl: "./images/work/icon-design.svg",
                altText: "Web Design Icon",
                title: "Web Design",
                description: "The most modern and high-quality design made at a professional level."
            },
            {
                imageUrl: "./images/work/icon-dev.svg",
                altText: "Web Development Icon",
                title: "Web Development",
                description: "High-quality development of sites at the professional level."
            },
            {
                imageUrl: "./images/work/icon-app.svg",
                altText: "Mobile App Icon",
                title: "Mobile Apps",
                description: "Professional development of applications for iOS and Android."
            },
            {
                imageUrl: "./images/work/icon-photo.svg",
                altText: "Camera Icon",
                title: "Video Editing",
                description: "I create high-quality gaming video edits with smooth transitions."
            }
        ];

        this.testimonialData = [
            {
                imageUrl: "./images/work/avatar-1.png",
                altText: "Deepak Reddy",
                title: "Deepak Reddy",
                description: "I needed a custom website for my restaurant, and Shashank built it exactly how I envisioned. The site is fast, responsive, and user-friendly. He even optimized it for SEO, which boosted our traffic. Will definitely work with him again!",
                date: "29 December, 2023"
            },
            {
                imageUrl: "./images/work/avatar-2.png",
                altText: "Nisha Singh",
                title: "Nisha Singh",
                description: "We were struggling with cloud deployment, but Shashank set up our Azure infrastructure efficiently. Thanks to him, our app runs smoothly and scales well. Fantastic work!",
                date: "13 March, 2024"
            },
            {
                imageUrl: "./images/work/avatar-3.png",
                altText: "Celeste Ivy",
                title: "Celeste Ivy",
                description: "Shashank created an exceptionally efficient and responsive web application for us. His extensive knowledge of Angular and .NET guaranteed a seamless, trouble-free development and deployment from beginning to end.",
                date: "21 July, 2024"
            },
            {
                imageUrl: "./images/work/avatar-4.png",
                altText: "Finley Beck",
                title: "Finley Beck",
                description: "Shashank revamped our old website, making it modern and lightning-fast. His attention to detail and problem-solving skills are top-notch. Our conversion rates improved significantly!",
                date: "11 December, 2024"
            }
        ];
    }

    onContactClick(): void {
        this.router.navigate(['/contact']);
    }

    toggleTestimonialModal(testimonial?: ITestimonialData): void {
        this.isModalOpen = !this.isModalOpen;

        if(this.isModalOpen) this.activeTestimonialData = testimonial;
    }
}
