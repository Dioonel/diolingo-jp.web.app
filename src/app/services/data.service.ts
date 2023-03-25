import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

import { LoginUser } from './../models/user';
import { Kanji, KanjiCreateDTO } from '../models/kanji';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://powerful-mesa-42995.herokuapp.com';

  constructor(private http: HttpClient) {}

  login(user: LoginUser) {
    return this.http.post<any>(`${this.url}/auth/login`, user)
    .pipe(map(data => {
      if(data?.token) {
        return data;
      } else {
        return null;
      }
    }));
  }

  createKanji(kanji: KanjiCreateDTO) {
    return this.http.post<Kanji>(`${this.url}/kanji`, kanji);
  }
}
