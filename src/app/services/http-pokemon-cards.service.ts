import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CardsModel } from '../models/card-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpPokemonCardsService {
  constructor(private http: HttpClient) {}

  public getCards(params: object): Observable<CardsModel> {
    let url = `https://api.pokemontcg.io/v1/cards`;
    const httpParams = new HttpParams({ fromObject: {...params}});
    return this.http.get<CardsModel>(url, { params: httpParams });
  }
}