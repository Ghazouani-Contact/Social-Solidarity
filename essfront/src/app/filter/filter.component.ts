import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { PostService } from '../service/postService/post.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../pages/footer/footer.component";

@Component({
    selector: 'app-filter',
    standalone: true,
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss',
    imports: [CommonModule, RouterLink, RouterLinkActive, FooterComponent]
})
export class FilterComponent {
  categoryName !: string;
  posts: any[] = [];
  postForm = {
    name: '',
    content: ''
    }; 
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.loadPostsByCategory(this.categoryName);
    });
  }

  loadPostsByCategory(category: string): void {
    this.postService.getPostsByCategory(category).subscribe(
      (posts: any[]) => {
        this.posts = posts.map(post => {
          if (post.filePath) {
            post.filePath = 'data:image/jpeg;base64,' + post.filePath;
          }
          return post;
        });
      },
      (error) => {
        console.error('Error fetching posts for category:', error);
      }
    );
  }
}
