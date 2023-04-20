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

  getGenericById<T>(id: string, type: 'kanji' | 'words') {
    return this.http.get<T>(`${this.url}/${type}/${id}`);
  }

  updateKanji(kanji: Kanji, id: string) {
    return this.http.patch<Kanji>(`${this.url}/kanji/${id}`, kanji);
  }

  updateWord(word: Word, id: string) {
    return this.http.patch<Word>(`${this.url}/words/${id}`, word);
  }

  deleteKanji(id: string) {
    return this.http.delete(`${this.url}/kanji/${id}`);
  }

  deleteWord(id: string) {
    return this.http.delete(`${this.url}/words/${id}`);
  }
}
