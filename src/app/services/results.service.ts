import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private apiUrl = 'http://localhost:3005/elections';

  constructor(private http: HttpClient) {}

  // getVotesByElection(electionId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/getElection/${electionId}`);
  // }
  addElection(election: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.post(`${this.apiUrl}/addElection`, election,{headers});
  }

  getElections(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.get(`${this.apiUrl}/getElections`,{headers});
  }
  updateElection(id: string, election: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.put(`${this.apiUrl}/updateElection/${id}`, election,{headers});
  }

  deleteElection(id: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.delete(`${this.apiUrl}/deleteElection/${id}`,{headers});
  }
  getElectionById(id: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.get(`${this.apiUrl}/getElection/${id}`,{headers});
  }

  // getVotesByCandidate(candidateId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/candidate/${candidateId}`);
  // }
}
