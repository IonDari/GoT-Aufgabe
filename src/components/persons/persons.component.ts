import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GotService } from '../../services/got.service';
import { Person } from '../../services/models/persons.model';
import { Quotes } from '../../services/models/quotes.model';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsComponent implements OnInit {
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
  persons: Person[] = [];
  filteredPersons: Person[] = [];
  searchQuery: string = '';
  quotes: Quotes[] = [];

  constructor(private gotService: GotService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.gotService.getPersons().subscribe(data => {
      this.persons = data;
      this.filterPersons();
      this.cdr.detectChanges();
    });
  }

  onSearchChange() {
    this.filterPersons();
  }

  filterPersons() {
    this.filteredPersons = this.persons.filter(person => {
      return person.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  openedPanelIndex: number | null = null;
  onPanelClick(index: number): void {
    if (this.openedPanelIndex !== null && this.openedPanelIndex !== index) {
      // Schließt das vorherige Panel, wenn eines geöffnet ist
      this.panels.toArray()[this.openedPanelIndex].close();
    }

    if (this.openedPanelIndex === index) {
      // Wenn dasselbe Panel erneut angeklickt wird, schließt es
      this.panels.toArray()[index].close();
      this.openedPanelIndex = null;
    } else {
      // Öffnet das ausgewählte Panel
      this.panels.toArray()[index].open();
      this.openedPanelIndex = index;

      this.getPersonQuotes(this.filteredPersons[index].slug);
    }
  }

  getPersonQuotes(personSlug: string) {
    this.quotes.splice(0)
    this.gotService.getPersonQuotes(personSlug, 3).subscribe(data => {
      this.quotes = data;
      this.cdr.detectChanges();
    });
  } 
}
