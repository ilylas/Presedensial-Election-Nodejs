import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from '../classes/candidate';
import { Observable } from 'rxjs';
import { Comment } from "../classes/comment";  // Path to your comment class or interface


@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:3005/candidates';

  constructor(private http: HttpClient) {}

  // getAll(): Observable<Candidate[]> {
  //   // Fetch candidates from API
  //   return this.http.get<Candidate[]>(this.apiUrl+'/getAllCandidats')
  // }
  // addCandidate(candidate: Candidate): Observable<Candidate> {
  //   return this.http.post<Candidate>(this.apiUrl+"/addCandidat", candidate);
  // }
  // deleteCandidate(id:string){
  //   this.http.delete<Candidate>(this.apiUrl+"/deleteCandidat/"+id);
  // }

  // updateCandidate(id:string,candidate: Candidate): Observable<Candidate>{
  //   return this.http.put<Candidate>(this.apiUrl+"/updateCandidat/"+id,candidate);
  // }

  // getById(id: string): Observable<Candidate> {
  //   return this.http.get<Candidate>(`${this.apiUrl}/getCandidat/${id}`);
  // }
  getAllCandidates(): Observable<any[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.get<any[]>(`${this.apiUrl}/getAllCandidats`,{headers});
  }

  // Get a candidate by ID
  getCandidateById(id: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.get<any>(`${this.apiUrl}/getCandidat/${id}`,{headers});
  }

  // Add a new candidate
  // addCandidate(candidate: any, file: File): Observable<any> {
  //   const token = sessionStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', token || '');
  //   const formData = new FormData();
  //   formData.append('name', candidate.name);
  //   formData.append('position', candidate.position);
  //   formData.append('file', file);

  //   return this.http.post<any>(`${this.apiUrl}/addCandidatAdmin`, formData,{headers});
  // }

  addCandidate(formData: FormData): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);

    // Send the FormData to the backend
    return this.http.post(`${this.apiUrl}/addCandidatAdmin`, formData, { headers });
  }

  // Update a candidate
  updateCandidate(id: string, candidate: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.put<any>(`${this.apiUrl}/updateCandidat/${id}`, candidate,{headers});
  }

  // Delete a candidate
  deleteCandidate(id: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.delete<any>(`${this.apiUrl}/deleteCandidat/${id}`,{headers});
  }
  addComment(candidateId: number, comment: Comment): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.post<any>(`${this.apiUrl}/addComment`, { candidateId, comment },{headers});
  }
  
  // addComment(candidateId: string, comment: Comment): Observable<void> {
  //   return this.http.post<void>(`${this.apiUrl}/addComment/${candidateId}`,comment);
  // }
}
