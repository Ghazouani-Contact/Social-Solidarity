import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PostService } from '../../service/postService/post.service';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ RouterLink,RouterLinkActive],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  posts: any[] = [];
  postForm = {
    name: '',
    content: ''
    }; 
  selectedFile: File | null = null;

constructor (private postService:PostService){ }
ngOnInit(): void {
  this.postService.getPosts().subscribe({
    next: posts => {
      if (posts) {
        this.posts = posts.map(post => {
          if (post.filePath) {
            post.filePath = 'data:image/jpeg;base64,' + post.filePath;
          }
          return post;
        });
        console.log(this.posts);
      } else {
        this.posts = [];
      }
    },
    error: err => {
      console.error('Error fetching posts:', err);
      this.posts = [];
    }
  });
}

}
