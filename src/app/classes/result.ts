export class Result {
     name!:string;
     votes!:string[];

    private constructor(name:string,votes:string[]){
        this.name=name
        this.votes=votes
    }
}
