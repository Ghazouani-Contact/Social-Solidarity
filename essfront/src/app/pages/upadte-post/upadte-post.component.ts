import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PostService } from '../../service/postService/post.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-upadte-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upadte-post.component.html',
  styleUrl: './upadte-post.component.scss'
})
export class UpadtePostComponent{
  postForm!: FormGroup;
  selectedFile: File | null = null;
  postId!: number;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.postId = this.route.snapshot.params['id']; // Assuming you're passing the post ID in the route
  }

  ngOnInit(): void {
    this.loadPostData();
  }

  loadPostData(): void {
    this.postService.getPostById(this.postId).subscribe(data => {
      this.postForm.patchValue({
        name: data.name,
        content: data.content,
        category: data.categoryId
      });
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  updatePost(): void {
    if (this.postForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.postForm.get('name')?.value);
    formData.append('content', this.postForm.get('content')?.value);
    formData.append('categoryId', this.postForm.get('category')?.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.postService.updatePost(this.postId, formData).subscribe(
      response => {
        console.log('Post updated successfully', response);
        this.router.navigate(['/siglepost', this.postId]);// Redirect to posts list or any other page
      },
      error => {
        console.error('Error updating post', error);
      }
    );
  }
}

