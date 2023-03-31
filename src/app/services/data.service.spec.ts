import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { LoginUser, LoginData } from './../models/user';
import { Kanji, KanjiCreateDTO } from '../models/kanji';
import { Word, WordCreateDTO } from '../models/word';

fdescribe('DataService', () => {
  let service: DataService;
  let httpController: HttpTestingController;
  const url = 'https://powerful-mesa-42995.herokuapp.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        DataService,
      ]
    });
    service = TestBed.inject(DataService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', (doneFn) => {
    const mockResponse: LoginData = { token: 'token_jwt_123', user: { username: 'test', password: 'test123' } };
    const user: LoginUser = { username: 'test', password: 'test123' };

    service.login({...user}).subscribe((response: LoginData) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/auth/login`);
    req.flush(mockResponse);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);
  });

  it('should create kanji', (doneFn) => {
    const mockResponse: Kanji = { id: 1, kanji: '日', meaning: ['Day', 'Sun'], pronunciation: ['にち', 'び'], notes: '', created_at: new Date() };
    const kanji: KanjiCreateDTO = { kanji: '日', meaning: ['Day', 'Sun'], pronunciation: ['にち', 'び'], notes: '' };

    service.createKanji({...kanji}).subscribe((response: Kanji) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/kanji`);
    req.flush(mockResponse);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(kanji);
  });

  it('should create word', (doneFn) => {
    const mockResponse: Word = { id: 1, word: '漢字', meaning: ['Kanji', 'Word'], pronunciation: ['かんじ'], notes: '', created_at: new Date() };
    const word: WordCreateDTO = { word: '漢字', meaning: ['Kanji', 'Word'], pronunciation: ['かんじ'], notes: '' };

    service.createWord({...word}).subscribe((response: Word) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/words`);
    req.flush(mockResponse);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(word);
  });
});

