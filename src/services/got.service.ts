import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from './models/house.model';
import { Observable } from 'rxjs';
import { Person } from './models/persons.model';
import { Quotes } from './models/quotes.model';

@Injectable({
  providedIn: 'root'
})
export class GotService {

  url = 'https://api.gameofthronesquotes.xyz/v1'

  constructor(private http:HttpClient) { }

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.url + "/houses");
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url + "/characters");
  }

  getRandomQuotes(quotes: number){  
    return this.http.get<Quotes[]>(this.url + "/random/" + quotes);
  }

  getPersonQuotes(person: string, qoutes: number){
    return this.http.get<Quotes[]>(this.url + "/author/" + person +"/" + qoutes);
  }
}
