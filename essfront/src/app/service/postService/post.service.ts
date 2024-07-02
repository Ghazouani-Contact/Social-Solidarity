import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { of } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class PostService {
  private apiUrl ='http://localhost:8080/api'

  constructor(private http:HttpClient) { } 
  createNewPost(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return of(null);;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/posts`, data, { headers });
  }   

  getPosts():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/posts`);
  }

  getPostById(postId:number): Observable <any>{
      return this.http.get<any>(`${this.apiUrl}/posts/${postId}`);
    }

   getUserPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/users/${userId}`);
  }
  getPostsByCategory(categoryName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/categories/${categoryName}`);
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`); // Assuming this endpoint returns the list of categories
  }
  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${postId}`, { responseType: 'text' });
  }
  updatePost(postId: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return of(null);;
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.put(`${this.apiUrl}/posts/${postId}`, data, { headers });
  }
}
