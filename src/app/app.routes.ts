import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HiraganaComponent } from './components/hiragana/hiragana.component';
import { KatakanaComponent } from './components/katakana/katakana.component';
import { KanjiComponent } from './components/kanji/kanji.component';
import { WordComponent } from './components/word/word.component';
import { LoginComponent } from './components/login/login.component';
import { PlayComponent } from './components/play/play.component';
import { GuessComponent } from './components/guess/guess.component';
import { PairsComponent } from './components/pairs/pairs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hiragana', component: HiraganaComponent },
  { path: 'katakana', component: KatakanaComponent },
  { path: 'kanji', component: KanjiComponent },
  { path: 'words', component: WordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'play', component: PlayComponent },
  { path: 'play/guess', component: GuessComponent },
  { path: 'play/pairs', component: PairsComponent },
];
