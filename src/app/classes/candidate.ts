export class Candidate {
    id: number;
    name: string;
    party: string;
    bio: string;
    photoUrl: string;
    favorites: boolean;
    comments: Comment[];
  
    constructor(
      id: number,
      name: string,
      party: string,
      bio: string,
      photoUrl: string,
      favorites: boolean,
      comments: Comment[] = [] // Default to an empty array
    ) {
      this.id = id;
      this.name = name;
      this.party = party;
      this.bio = bio;
      this.photoUrl = photoUrl;
      this.favorites = favorites;
      this.comments = comments;
    }
}


// export interface Comment {
//     username: string;
//     text: string;
//     date?: string; // Optional because the frontend may not always send it
//   }