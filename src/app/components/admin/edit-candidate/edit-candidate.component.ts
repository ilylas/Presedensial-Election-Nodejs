import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  standalone:true,
  selector: 'app-edit-candidate',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './edit-candidate.component.html',
  styleUrl: './edit-candidate.component.css'
})
export class EditCandidateComponent implements OnInit {
  candidate = {
    name: '',
    position: ''
  };
  candidateId: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router,private candidateService: CandidateService) {}

  ngOnInit(): void {
    // Fetch candidate details from the route params or backend
    this.candidateId = this.route.snapshot.paramMap.get('id');
    console.log('Editing candidate with ID:', this.candidateId);

    // Placeholder: Simulate fetching candidate data
    // this.candidate = {
    //   name: 'John Doe',
    //   position: 'President'
    // };
    if (this.candidateId) {
      this.candidateService.getCandidateById(this.candidateId).subscribe(
        (data) => {
          this.candidate = data;
        },
        (error) => {
          console.error('Error fetching candidate:', error);
          //this.errorMessage = 'Error fetching candidate details.';
        }
      );
    }
  }

  onSubmit(): void {
    if (this.candidate.name && this.candidate.position) {
      this.candidateService.updateCandidate(this.candidateId!, this.candidate).subscribe(
        (response) => {
          console.log('Candidate updated:', response);
          // Redirect to the admin dashboard after updating
          this.router.navigate(['/admin/dashboard']);
        },
        (error) => {
          console.error('Error updating candidate:', error);
          //this.errorMessage = 'Error updating candidate. Please try again later.';
        }
      );
    } 
    // else {
    //   this.errorMessage = 'Please fill out all fields.';
    // }
  }
}
