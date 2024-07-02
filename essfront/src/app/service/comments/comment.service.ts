import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl ='http://localhost:8080/api';

  constructor(private http:HttpClient) { }

  createComment(postId:number,content:string):Observable<any>{
    const params={
      postId:postId,
    }
    return this.http.post<any>(this.apiUrl +`/comments/create`,content,{params});
  }
  getAllCommentsByPost(postId:number):Observable<any>{
    return this.http.get(this.apiUrl +`/comments/${postId}`);
  }
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/comments/${commentId}`, { responseType: 'text' });
  }
} 
