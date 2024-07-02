import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/user'; 

  constructor(private http: HttpClient) { }

  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signupData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    });
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      
      })
    });
  }

  storeUserData(token: string, user: any): void {
    localStorage.setItem('token', token); 
    localStorage.setItem('user', JSON.stringify(user));
  }


      logout(): Observable<string> {
        return this.http.post(`${this.baseUrl}/logout`, null, { responseType: 'text' });
      }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUserId(): number | null {
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.error('User data not found in local storage');
      return null;
    }
 
    try {
      const user = JSON.parse(userString);
      return user.id || null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
getCurrentUserId(): number | null {
  const userString = localStorage.getItem('user');
  if (!userString) {
    console.error('User data not found in local storage');
    return null;
  }

  try {
    const user = JSON.parse(userString);
    return user.id || null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

}
