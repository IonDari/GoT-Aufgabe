
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GotService } from '../../services/got.service';
import { House } from '../../services/models/house.model';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousesComponent implements OnInit {
  houses: House[] = [];
  filteredHouses: House[] = [];
  searchQuery: string = '';


  constructor(private gtoservice: GotService, private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.gtoservice.getHouses().subscribe((data) => {
      this.houses = data;
      this.filterHouses();
      this.cdr.detectChanges();
      console.log(data)
    })
  }

  onSearchChange() {
    this.filterHouses();
  }

  filterHouses() {
    this.filteredHouses = this.houses.filter((house) => {
      return house.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

 }
