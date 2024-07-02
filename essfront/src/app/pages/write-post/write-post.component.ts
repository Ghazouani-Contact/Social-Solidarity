import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../service/postService/post.service';
import { AuthService } from '../../service/authService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-write-post',
  standalone: true,
  imports: [FooterComponent , ReactiveFormsModule,CommonModule],
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.scss'
})
export class WritePostComponent {
  selectedFile!: File;
  postForm!: FormGroup;
  isLoggedIn = false; // Flag to track user login status

  constructor(private fb: FormBuilder, private router:Router,private postService:PostService, private authService: AuthService){}

  
ngOnInit() {
  this.postForm = this.fb.group({
    name:[null,Validators.required],
    content:[null,Validators.required],
    file: [null], 
    category: [null, Validators.required]// Category form control

  });
  this.isLoggedIn = this.authService.isLoggedIn(); // Check if user is logged in

}



createPost() {
  if (!this.authService.isLoggedIn()) {
    console.error('User is not logged in');
    return;
  }

  const userId = this.authService.getUserId();
  if (!userId) {
    console.error('User ID not found');
    return;
  }

  const formData = new FormData();
  formData.append('name', this.postForm.value.name);
  formData.append('content', this.postForm.value.content);
  formData.append('userId', userId.toString());
  formData.append('categoryId', this.postForm.value.category); // Use categoryId here
  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }

  this.postService.createNewPost(formData).subscribe(
    res => {
      console.log("Post created successfully");
      
      this.router.navigateByUrl("/");
    },
    error => {
      console.log("Error creating post");
    }
  );
}


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

}
