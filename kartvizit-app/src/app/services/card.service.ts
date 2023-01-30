import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService implements OnInit {
  cards!: Card[];

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}
  ngOnInit(): void {}

  getCards(): void {
    this.http.get<Card[]>(this.apiUrl).subscribe((res: Card[]) => {
      this.cards = res;
    });
  }

  addCard(card: Card): Observable<any> {
    return this.http.post(this.apiUrl, card);
  }
  updateCard(cardId: number): Observable<any> {
    return this.http.put(this.apiUrl, cardId);
  }

  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(this.apiUrl + cardId);
  }
}
