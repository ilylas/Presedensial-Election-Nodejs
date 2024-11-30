import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  standalone:true,
  selector: 'app-add-candidate',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './add-candidate.component.html',
  styleUrl: './add-candidate.component.css'
})
export class AddCandidateComponent implements OnInit{
  

    candidate = {
      name: '',
      position: ''
    };
    selectedFile: File | null = null;
    constructor(private router: Router, private candidateService: CandidateService) {}

    isAdmin: boolean = false;
  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
      this.isAdmin = decodedToken.role === 'admin';
      if (!this.isAdmin) {
        this.router.navigate(['/']); // Redirect to a "Not Authorized" page
      }
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }
  }
 
    onFileSelect(event: any): void {
      // Handle file selection
      this.selectedFile = event.target.files[0];
    }
  
    onSubmit(): void {
      console.log('Candidate Name:', this.candidate.name);
      console.log('Candidate Position:', this.candidate.position);
      console.log('Selected File:', this.selectedFile);
      if (this.selectedFile && this.candidate.name && this.candidate.position) {
        // Call the service to add a new candidate
        const formData = new FormData();
        formData.append('name', this.candidate.name);
        formData.append('position', this.candidate.position);
        formData.append('file', this.selectedFile);
  
        this.candidateService.addCandidate(formData).subscribe(
          (response) => {
            console.log('Candidate added:', response);
            // Redirect to the Admin Dashboard after saving
            this.router.navigate(['/admin/dashboard']);
          },
          (error) => {
            console.error('Error adding candidate:', error);
          }
        );
      } else {
        console.log('Please fill in all fields and select a photo');
      }
    }
  }
  