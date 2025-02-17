import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

@Component({
    selector: 'home',
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(private readonly seoService: SeoService) {
        this.seoService.updateMetaTags("Shashank Reddy", "Shashank portfolio, shashank reddy portfolio, Shashank Reddy Portfolio, Shashank Reddy Nallu portfolio, shashank portfolio, portfolio shashank, shashank, portfolio, Nallu shashank portfolio, shashank reddy portfolio");
    }
}
