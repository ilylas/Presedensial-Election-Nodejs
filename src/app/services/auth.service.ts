import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3005/users'; // Update with your backend login endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/login", { email, password });
  }
  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }
  logout() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe(
       (response) => {
        
        sessionStorage.removeItem('token');
        console.log('Déconnexion réussie', response);
        this.router.navigate(['/loginAdherant']);
      },
      (err) => {
        console.error('Erreur lors de la déconnexion', err);
      }
    );
  }
}
