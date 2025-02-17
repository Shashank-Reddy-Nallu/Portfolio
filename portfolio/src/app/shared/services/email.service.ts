import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormData } from '../models/contact-form.model';

interface IEmailServiceData {
  templateId: number;
  apiUrl: string;
  apiKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailServiceData: IEmailServiceData = environment.emailServiceData;

  constructor(private http: HttpClient) { }

  sendEmail(data: ContactFormData): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'api-key': this.emailServiceData.apiKey,
      'content-type': 'application/json',
    });

    const body = {
      to: [
        {
          email: 'nallushashankreddy@gmail.com',
          name: 'Shashank Reddy Nallu',
        },
      ],
      templateId: this.emailServiceData.templateId,
      params: {
        name: data.name,
        email: data.email,
        country: data.country?.length ? data.country : "NA",
        phone: data.phone?.length ? data.phone : "NA",
        message: data.message,
      },
    };

    return this.http.post(this.emailServiceData.apiUrl, body, { headers });
  }
}