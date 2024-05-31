import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { LoginUser, LoginData } from '@models/user';
import { Kanji, KanjiCreateDTO, KanjiFilter } from '@models/kanji';
import { Word, WordCreateDTO } from '@models/word';

describe('DataService', () => {
  let service: DataService;
  let httpController: HttpTestingController;
  const url = 'https://powerful-mesa-42995.herokuapp.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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

    service.login({ ...user }).subscribe((response: LoginData) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/auth/login`);
    req.flush(mockResponse);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);
  });

  it('should create kanji', (doneFn) => {
    const mockResponse: Kanji = { _id: '1', kanji: '日', meaning: ['Day', 'Sun'], pronunciation: ['にち', 'び'], notes: '', created_at: new Date() };
    const kanji: KanjiCreateDTO = { kanji: '日', meaning: ['Day', 'Sun'], pronunciation: ['にち', 'び'], notes: '' };

    service.createKanji({ ...kanji }).subscribe((response: Kanji) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/kanji`);
    req.flush(mockResponse);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(kanji);
  });

  it('should create word', (doneFn) => {
    const mockResponse: Word = { _id: '1', word: '漢字', meaning: ['Kanji', 'Word'], pronunciation: ['かんじ'], notes: '', created_at: new Date() };
    const word: WordCreateDTO = { word: '漢字', meaning: ['Kanji', 'Word'], pronunciation: ['かんじ'], notes: '' };

    service.createWord({ ...word }).subscribe((response: Word) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/words`);
    req.flush(mockResponse);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(word);
  });

  it('should get kanji without params', (doneFn) => {
    const mockResponse: Kanji[] = [
      {
        _id: '1',
        kanji: '日',
        meaning: ['Day', 'Sun'],
        pronunciation: ['にち', 'び'],
        notes: '',
        created_at: new Date()
      },
      {
        _id: '2',
        kanji: '月',
        meaning: ['Moon', 'Month'],
        pronunciation: ['げつ', 'がつ'],
        notes: '',
        created_at: new Date()
      },
      {
        _id: '3',
        kanji: '火',
        meaning: ['Fire'],
        pronunciation: ['か'],
        notes: '',
        created_at: new Date()
      }
    ];

    service.getKanji().subscribe((response: Kanji[]) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/kanji`);
    req.flush(mockResponse);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.keys().length).toEqual(0);
  });

  it('should get kanji with params', (doneFn) => {
    const mockParams = { kanji: '日', meaning: 'Day', pronunciation: 'にち', limit: 1, skip: 1 };
    const mockResponse: Kanji[] = [
      {
        _id: '4',
        kanji: '日',
        meaning: ['Day', 'Sun'],
        pronunciation: ['にち', 'び'],
        notes: '',
        created_at: new Date()
      }
    ];

    service.getKanji(mockParams).subscribe((response: Kanji[]) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/kanji?meaning=Day&pronunciation=%E3%81%AB%E3%81%A1&kanji=%E6%97%A5&limit=1&skip=1`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.keys().length).toEqual(5);
    expect(req.request.params.get('kanji')).toEqual(mockParams.kanji);
    expect(req.request.params.get('meaning')).toEqual(mockParams.meaning);
    expect(req.request.params.get('pronunciation')).toEqual(mockParams.pronunciation);
    expect(req.request.params.get('limit')).toEqual(mockParams.limit.toString());
    expect(req.request.params.get('skip')).toEqual(mockParams.skip.toString());
    req.flush(mockResponse);
  });

  it('should get one kanji', (doneFn) => {
    const mockId = '123';
    const mockResponse: Kanji = { _id: '123', kanji: '漢', meaning: ['Kanji'], pronunciation: ['かん'], notes: '', created_at: new Date()};

    service.getOneKanji(mockId).subscribe(response => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/kanji/${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get words without params', (doneFn) => {
    const mockResponse: Word[] = [
      {
        _id: '1',
        word: '漢字',
        meaning: ['Kanji', 'Word'],
        pronunciation: ['かんじ'],
        notes: '',
        created_at: new Date()
      },
      {
        _id: '2',
        word: '日本語',
        meaning: ['Japanese'],
        pronunciation: ['にほんご'],
        notes: '',
        created_at: new Date()
      },
      {
        _id: '3',
        word: '英語',
        meaning: ['English'],
        pronunciation: ['えいご'],
        notes: '',
        created_at: new Date()
      }
    ];

    service.getWords().subscribe((response: Word[]) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/words`);
    req.flush(mockResponse);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.keys().length).toEqual(0);
  });

  it('should get words with params', (doneFn) => {
    const mockParams = { word: '漢字', meaning: 'Kanji', pronunciation: 'かんじ', limit: 1, skip: 1 };
    const mockResponse: Word[] = [
      {
        _id: '4',
        word: '漢字',
        meaning: ['Kanji', 'Word'],
        pronunciation: ['かんじ'],
        notes: '',
        created_at: new Date()
      }
    ];

    service.getWords(mockParams).subscribe((response: Word[]) => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/words?meaning=Kanji&pronunciation=%E3%81%8B%E3%82%93%E3%81%98&word=%E6%BC%A2%E5%AD%97&limit=1&skip=1`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.keys().length).toEqual(5);
    expect(req.request.params.get('word')).toEqual(mockParams.word);
    expect(req.request.params.get('meaning')).toEqual(mockParams.meaning);
    expect(req.request.params.get('pronunciation')).toEqual(mockParams.pronunciation);
    expect(req.request.params.get('limit')).toEqual(mockParams.limit.toString());
    expect(req.request.params.get('skip')).toEqual(mockParams.skip.toString());
    req.flush(mockResponse);
  });

  it('should get one word', (doneFn) => {
    const mockId = '123';
    const mockResponse: Word = { _id: '123', word: '漢字', meaning: ['Kanji'], pronunciation: ['かんじ'], notes: '', created_at: new Date()};

    service.getOneWord(mockId).subscribe(response => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/words/${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get generic by id (kanji)', (doneFn) => {
    const mockId = '123';
    const mockType = 'kanji';
    const mockResponse: Kanji = {
      _id: '123',
      kanji: '漢',
      meaning: ['Kanji'],
      pronunciation: ['kan'],
      notes: 'Some notes',
      created_at: new Date()
    };

    service.getGenericById<Kanji>(mockId, mockType).subscribe(response => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/${mockType}/${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get generic by id (word)', (doneFn) => {
    const mockId = '123';
    const mockType = 'words';
    const mockResponse: Word = {
      _id: '123',
      word: '漢字',
      meaning: ['Kanji'],
      pronunciation: ['kanji'],
      notes: 'Some notes',
      created_at: new Date()
    };

    service.getGenericById<Word>(mockId, mockType).subscribe(response => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/${mockType}/${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update kanji', (doneFn) => {
    const mockId = '123';
    const mockKanji: Kanji = {
      _id: '123',
      kanji: '漢',
      meaning: ['Kanji'],
      pronunciation: ['kan'],
      notes: 'Some notes',
      created_at: new Date()
    };

    service.updateKanji(mockKanji, mockId).subscribe(response => {
      expect(response).toEqual(mockKanji);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/kanji/${mockId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockKanji);
  });

  it('should update word', (doneFn) => {
    const mockId = '123';
    const mockWord: Word = {
      _id: '123',
      word: '漢字',
      meaning: ['Kanji'],
      pronunciation: ['kanji'],
      notes: 'Some notes',
      created_at: new Date()
    };

    service.updateWord(mockWord, mockId).subscribe(response => {
      expect(response).toEqual(mockWord);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/words/${mockId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockWord);
  });

  it('should delete kanji', (doneFn) => {
    const mockId = '123';

    service.deleteKanji(mockId).subscribe(response => {
      expect(response).toBeNull();
      doneFn();
    });

    const req = httpController.expectOne(`${url}/kanji/${mockId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should delete word', (doneFn) => {
    const mockId = '123';

    service.deleteWord(mockId).subscribe(response => {
      expect(response).toBeNull();
      doneFn();
    });

    const req = httpController.expectOne(`${url}/words/${mockId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get stats', (doneFn) => {
    const mockResponse = {
      _id: '1',
      user_id: '1',
      overall: {
        total_correct: 0,
        total_incorrect: 0,
        total_time: 0
      },
      guess: {
        history: [],
        overall: {
          total_correct: 0,
          total_incorrect: 0,
          total_time: 0,
          average_time: 0
        }
      },
      pairs: {
        history: [],
        overall: {
          total_correct: 0,
          total_incorrect: 0,
          total_time: 0,
          average_time: 0
        }
      },
      last_checked: '2021-07-01'
    };

    service.getStats().subscribe(response => {
      expect(response).toEqual(mockResponse);
      doneFn();
    });

    const req = httpController.expectOne(`${url}/stats`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});

