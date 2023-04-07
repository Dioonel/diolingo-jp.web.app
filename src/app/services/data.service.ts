import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginUser, LoginData } from './../models/user';
import { Kanji, KanjiCreateDTO } from '../models/kanji';
import { Word, WordCreateDTO } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://powerful-mesa-42995.herokuapp.com';

  constructor(private http: HttpClient) {}

  awakeHeroku() {
    this.http.get(this.url);
  }

  login(user: LoginUser) {
    return this.http.post<LoginData>(`${this.url}/auth/login`, user);
  }

  createKanji(kanji: KanjiCreateDTO) {
    return this.http.post<Kanji>(`${this.url}/kanji`, kanji);
  }

  createWord(word: WordCreateDTO) {
    return this.http.post<Word>(`${this.url}/words`, word);
  }

  getKanji() {
    return this.http.get<Kanji[]>(`${this.url}/kanji`);
  }

  getWords() {
    return this.http.get<Word[]>(`${this.url}/words`);
  }
}
