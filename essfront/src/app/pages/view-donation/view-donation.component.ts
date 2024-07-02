import { Component } from '@angular/core';
import { PostService } from '../../service/postService/post.service';
import { AuthService } from '../../service/authService/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-view-donation',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './view-donation.component.html',
  styleUrl: './view-donation.component.scss'
})
export class ViewDonationComponent {
  userPosts: any[] = [];
  postForm = {
    name: '',
    content: ''
    }; 
  selectedFile: File | null = null;
  constructor(private postService: PostService, private authService: AuthService) { }
  
  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
    this.postService.getUserPosts(userId).subscribe({
      next: posts => {
        if (posts) {
          this.userPosts = posts.map(post => {
            if (post.filePath) {
              post.filePath = 'data:image/jpeg;base64,' + post.filePath;
            }
            return post;
          });
          console.log(this.userPosts);
        } else {
          this.userPosts = [];
        }
      },
      error: err => {
        console.error('Error fetching posts:', err);
        this.userPosts = [];
      }
    });
  }}

}
