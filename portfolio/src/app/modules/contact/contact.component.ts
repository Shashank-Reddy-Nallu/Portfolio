import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ContactFormData } from '../../shared/models/contact-form.model';
import { EmailService } from '../../shared/services/email.service';
import { finalize } from 'rxjs';
import { SeoService } from '../../shared/services/seo.service';

interface ISocialMediaUrls {
  linkedIn: string;
  gitHub: string;
  instagram: string;
  youtube: string;
}

@Component({
    selector: 'app-contact',
    imports: [ReactiveFormsModule, NgClass],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
  email: string = "nallushashankreddy@gmail.com";
  contactForm: FormGroup;
  isEmailSent!: boolean;
  isSuccess!: boolean;
  socialMediaUrls: ISocialMediaUrls = environment.socialMediaUrls;
  isSubmitBtnDisabled!: boolean;

  constructor(private readonly fb: FormBuilder, private readonly emailService: EmailService, private readonly seoService: SeoService) {
    this.seoService.updateMetaTags("Contact Shashank Reddy", "contact, contact me, Contact, Contact Me, Contact Shashank Reddy Nallu, Contact Shashank Reddy, Contact Shashank, Contact shashank, Contact shashank reddy, Contact shashank reddy nallu, contact shashank, contact shashank reddy, contact shashank reddy nallu, freelancer, freelancing, developer, Developer, Freelancer, Freelancing, Software Developer");

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      country: [''],
      // phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      phone: ['', [Validators.pattern(/^\d+$/)]],
      message: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitBtnDisabled = true;
      const formData: ContactFormData = {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        country: this.contactForm.get('country')?.value,
        phone: this.contactForm.get('phone')?.value,
        message: this.contactForm.get('message')?.value,
      }
      
      this.isEmailSent = false;

      // Send mail
      this.emailService.sendEmail(formData).pipe(
        finalize(() => {
          this.isEmailSent = true;
          this.scrollToBottom();
        })
      ).subscribe({
        next: (data) => {
          this.isSuccess = true;
        },
        error: (error) => {
          this.isSuccess = false;
          console.error('Error sending mail:', error);
        },
        complete: () => {
          // Reset form
          this.contactForm.reset();
        }
      });

      setTimeout(() => {
        this.isEmailSent = false;
        this.isSuccess = false;
        this.isSubmitBtnDisabled = false;
      }, 3000);
    }
  }

  private scrollToBottom(): void {
    document.getElementById('main-content')?.scroll({
      top: document.getElementById('main-content')?.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
