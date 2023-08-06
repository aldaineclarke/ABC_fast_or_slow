import { Component } from '@angular/core';

@Component({
  selector: 'app-letter-generator',
  templateUrl: './letter-generator.component.html',
  styleUrls: ['./letter-generator.component.scss']
})
export class LetterGeneratorComponent {
  private alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  selectedLetter = "";
  generateAlphabet(speed: "fast" | "slow"){
    let timeoutCount = 0;
    if(speed == "fast"){
      timeoutCount = 0;
    }else timeoutCount = 2;

    for(let letter of this.alphabetArr){
      setTimeout(()=>{
        this.selectedLetter = letter;
        return
      }, timeoutCount);
    }
  }



}
