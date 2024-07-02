import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../service/postService/post.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { CommentService } from '../../service/comments/comment.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/authService/auth.service';

@Component({
  selector: 'app-sigle-post',
  standalone: true,
  imports: [CommonModule,RouterLink,FooterComponent ,FormsModule],
  templateUrl: './sigle-post.component.html',
  styleUrl: './sigle-post.component.scss'
})
export class SiglePostComponent implements OnInit{

  postId!: number;
  postData: any;
  showMessageBox = false;
  newCommentContent = '';
  comments: any[] = [];
  isOwner = false; 
  userData: any;

  //currentUser: any = {};

  constructor(private route: ActivatedRoute, private postService: PostService,private commentService: CommentService,private router: Router,    private authService: AuthService  ) { }

  ngOnInit():void {
    this.postId = this.route.snapshot.params['id'];
    console.log(this.postId);
    this.getPostById();
    //this.loadCurrentUser();

  } 

  /*loadCurrentUser() {
    this.currentUser.name = this.authService.getCurrentUserName();
    this.currentUser.email = this.authService.getCurrentUserEmail();
    this.currentUser.contactNumber = this.authService.getCurrentUserPhoneNumber();
  }*/
  checkOwnership() {
    const currentUserId = this.authService.getCurrentUserId();
    this.isOwner = this.postData && this.postData.userId === currentUserId;
  }
  
  getPostById(){
    this.postService.getPostById(this.postId).subscribe(res=>{
    res.filePath = 'data:image/jpeg;base64,' + res.filePath;
      this.postData=res;
      console.log('Post Data:', this.postData); 
      this.userData = {
        name: res.userName,
        email: res.userEmail,
        userNumber: res.userNumber
    };
      console.log('user Data:', this.userData); 
      this.checkOwnership(); 
      console.log(res);
      this.getAllCommentsByPost();
    },error=>{
      console.log(error);
    }
  )
  }
  
 
  toggleMessageBox() {
    this.showMessageBox = !this.showMessageBox;
  }

    addComment() {
      if (!this.newCommentContent.trim()) {
        return;
      }
      this.commentService.createComment(this.postId, this.newCommentContent).subscribe(
        (response) => {
          console.log('Comment created:', response);
          if (response) {
            this.comments.unshift(response); 
          }
          this.newCommentContent = ''; 
        },
        (error) => {
          console.error('Error creating comment:', error);
        }
      );
    }
    editPost(): void {
      this.router.navigate(['posts/update/', this.postId]);
    }    

  getAllCommentsByPost(){
    this.commentService.getAllCommentsByPost(this.postId).subscribe(res=>{
      this.comments = res ? res.reverse() : []; 
      console.log("comment",this.comments);
    },error=>{
      console.log('Error creating comment:', error);
    })
  }
  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(response => {
      console.log('Comment deleted:', response);
      this.getAllCommentsByPost();
    }, error => {
      console.error('Error deleting comment:', error);
    });
  }

  deletePost() {
    this.postService.deletePost(this.postId).subscribe(response => {
      console.log('Post deleted:', response);
      this.router.navigate(['/']);
    }, error => {
      console.error('Error deleting post:', error);
    });
  }
}
