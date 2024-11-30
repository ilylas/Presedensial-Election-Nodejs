import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';
import { Comment } from "../../../classes/comment";  // Path to your comment class or interface

@Component({
  standalone:true,
  selector: 'app-candidate-details',
  imports: [CommonModule, FormsModule,],
  templateUrl: './candidate-details.component.html',
  styleUrl: './candidate-details.component.css'
})
export class CandidateDetailsComponent implements OnInit {
  
    candidateId: any;
    newComment: string = '';
    //candidateId: string | null = null;

  
    constructor(private route: ActivatedRoute,private candidateService : CandidateService) { }
  
    ngOnInit(): void {
      this.candidateId = this.route.snapshot.params['id'];
      this.candidateService.getCandidateById(this.candidateId).subscribe({
        next: (data) => {
          this.candidateId = data; // Assign the fetched candidate data
          console.log(this.candidateId);
        },
        error: (err) => console.error('Error fetching candidate:', err),
      });
      /*
      this.candidateId = {
        name: 'John Doe',
        party: 'Party A',
        bio: 'Focused on education reform, better healthcare, and job creation.',
        photoUrl: 'https://via.placeholder.com/150',
        isFavorite: false,
        comments: [
          { username: 'Alice', text: 'Great candidate! I support his vision.' },
          { username: 'Bob', text: 'His focus on education is crucial.' }
        ]
      };
      */
    }
  
    toggleFavorite(candidateId: any): void {
      candidateId.isFavorite = !candidateId.isFavorite;
    }
  
    vote(candidateId: any): void {
      this.candidateId = this.route.snapshot.paramMap.get('id');
      console.log(this.candidateId)
      //alert(`You have voted for ${candidateId.name}`);
    }
    c!:Comment
    addComment(candidateId: any): void {
      if (this.newComment.trim()) {
          this.c= {
          username: 'You', 
          text: this.newComment,
        };
        candidateId.comments.push(this.c);
        this.newComment = ''; 
        this.candidateService.addComment(candidateId,this.c).subscribe({
          next: () => {
            alert('Comment added successfully!');
            this.newComment = '';
            this.candidateId
          },
          error: (err) => console.error('Error adding comment:', err),
        });
      }

    }

  }
  