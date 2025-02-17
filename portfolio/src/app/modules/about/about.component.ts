import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../shared/services/blog.service';
import { SeoService } from '../../shared/services/seo.service';

interface ISkillSet {
  name: string;
  image: string;
}

interface IDetails {
  name: string;
  age: number;
  email: string;
  address: string;
  experience: number;
}

@Component({
    selector: 'about',
    imports: [RouterLink],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
  skills!: ISkillSet[];
  personalDetails!: IDetails;
  blogsCount: number = 5;

  constructor(private readonly blogService: BlogService, private readonly seoService: SeoService) {
    this.seoService.updateMetaTags("About Shashank Reddy", "about, about me, about shashank, about shashank, about shashank reddy, about shashank reddy nallu, Shashank, shashank, Shashank Reddy, shashank reddy, Shashank Reddy Nallu, shashank reddy nallu, shashankreddy, shashankreddynallu, Blogs, shashank reddy blogs, shashankreddynallublogs, shashank reddy nallu blogs, shashank reddy blogs, shashank blogs, Nallu, Shashank nallu, nallu shashank, Nallu Shashank, Nallu Shashank Reddy, nallu shashank reddy, Nallu Shashank");

    this.skills = [
      {
        name: "HTML",
        image: "html"
      },
      {
        name: "CSS",
        image: "css"
      },
      {
        name: "JavaScript",
        image: "JavaScript"
      },
      {
        name: "TypeScript",
        image: "typescript"
      },
      {
        name: "jQuery",
        image: "jQuery"
      },
      {
        name: "Bootstrap",
        image: "Bootstrap"
      },
      {
        name: "Angular",
        image: "Angular"
      },
      {
        name: "react.js",
        image: "react"
      },
      {
        name: "Blazor",
        image: "Blazor"
      },
      {
        name: ".Net Core",
        image: "dotnet-core"
      },
      {
        name: "flask",
        image: "python"
      },
      {
        name: "SQL Server",
        image: "sql-server"
      },
      {
        name: "PostgreSQL",
        image: "Postgre-SQL"
      },
      {
        name: "MySQL",
        image: "MySQL"
      },
      {
        name: "MongoDB",
        image: "MongoDB"
      },
      {
        name: "Azure",
        image: "azure"
      },
      {
        name: "AWS",
        image: "aws"
      },
      {
        name: "git",
        image: "git"
      },
    ]

    this.personalDetails = {
      name: "Shashank Reddy Nallu",
      age: Math.floor((new Date().getTime() - new Date('2001-06-15').getTime()) / 3.15576e+10),
      email: "nallushashankreddy@gmail.com",
      address: "Hyderabad, India",
      experience: Math.floor((new Date().getTime() - new Date('2022-08-24').getTime()) / 3.15576e+10)
    }

    this.blogService.getBlogsCount().subscribe(count => this.blogsCount = count);
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = "./pdf/resume.pdf";
    link.download = "Shashank_Resume_2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
