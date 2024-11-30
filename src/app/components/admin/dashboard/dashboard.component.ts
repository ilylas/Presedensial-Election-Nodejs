import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  standalone:true,
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 1200;
  totalVotes: number = 5000;
  totalCandidates: number = 25;

  // Added id for each candidate
  candidates :any[]= [
    // { id: 1, name: 'John Doe', position: 'President' },
    // { id: 2, name: 'Jane Smith', position: 'Secretary' },
    // { id: 3, name: 'Sam Brown', position: 'Treasurer' }
  ];

  comments = [
    { user: 'User1', text: 'Great candidate!', status: 'Pending' },
    { user: 'User2', text: 'Needs more experience.', status: 'Approved' },
    { user: 'User3', text: 'I support this candidate!', status: 'Pending' }
  ];
  selectedCandidate: any = null; // To store selected candidate for editing
  newCandidateName: string = '';
  newCandidatePosition: string = '';
  constructor(private candidateService: CandidateService, private router: Router) {}

  ngOnInit(): void {
    // Fetch data for platform stats, candidates, and comments
    // Example: this.fetchPlatformStats(), this.fetchCandidates(), this.fetchComments()
    this.fetchCandidates();
  }

  fetchCandidates(): void {
    this.candidateService.getAllCandidates().subscribe(
      (data) => {
        this.candidates = data;
        this.totalCandidates = this.candidates.length; 
      },
      (error) => {
        console.error('Error fetching candidates:', error);
      }
    );
  }

  // addCandidate(name: string, position: string, file: File): void {
  //   const newCandidate = { name, position };
  //   this.candidateService.addCandidate(newCandidate, file).subscribe(
  //     (response) => {
  //       console.log('Candidate added:', response);
  //       this.fetchCandidates(); 
  //     },
  //     (error) => {
  //       console.error('Error adding candidate:', error);
  //     }
  //   );
  //   console.log('Add new candidate');
  // }

  // editCandidate(candidate: any): void {
  //   this.selectedCandidate = candidate;
  //   this.newCandidateName = candidate.name;
  //   this.newCandidatePosition = candidate.position;
  //   console.log('Edit candidate:', candidate);
  // }

  // updateCandidate(): void {
  //   if (this.selectedCandidate) {
  //     const updatedCandidate = {
  //       name: this.newCandidateName,
  //       position: this.newCandidatePosition
  //     };
  //     this.candidateService.updateCandidate(this.selectedCandidate._id, updatedCandidate).subscribe(
  //       (response) => {
  //         console.log('Candidate updated:', response);
  //         this.fetchCandidates(); // Refresh the candidates list
  //         this.selectedCandidate = null; // Clear selected candidate
  //       },
  //       (error) => {
  //         console.error('Error updating candidate:', error);
  //       }
  //     );
  //   }
  // }

  deleteCandidate(candidate: any): void {
    if (confirm('Are you sure you want to delete this candidate?')) {
      console.log(this.selectedCandidate.id)
      this.candidateService.deleteCandidate(candidate._id).subscribe(
        (response) => {
          console.log('Candidate deleted:', response);
          this.fetchCandidates(); // Refresh the candidates list
        },
        (error) => {
          console.error('Error deleting candidate:', error);
        }
      );
    }
    const index = this.candidates.indexOf(candidate);
    if (index !== -1) {
      this.candidates.splice(index, 1);
    }
    console.log('Deleted candidate:', candidate);
  }

  approveComment(comment: any): void {
    // Approve comment
    comment.status = 'Approved';
    console.log('Approved comment:', comment);
  }

  deleteComment(comment: any): void {
    // Delete comment
    const index = this.comments.indexOf(comment);
    if (index !== -1) {
      this.comments.splice(index, 1);
    }
    console.log('Deleted comment:', comment);
  }
}
