import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GotService } from '../../services/got.service';
import { Quotes } from '../../services/models/quotes.model';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent implements OnInit { 

  quotes: Quotes[] = [];

  constructor(private gtoservice: GotService, private cdr: ChangeDetectorRef){}
  
  ngOnInit(){
    this.getRandomQuotes(5);
  }

  getRandomQuotes(quotes:number){
    this.gtoservice.getRandomQuotes(quotes).subscribe(data => {
      this.quotes = data;
      this.cdr.detectChanges();
      console.log(data)
    })
  }
}
