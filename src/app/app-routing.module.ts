import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HiraganaComponent } from './components/hiragana/hiragana.component';
import { KatakanaComponent } from './components/katakana/katakana.component';
import { KanjiComponent } from './components/kanji/kanji.component';
import { KanjiSubmitComponent } from './components/kanji-submit/kanji-submit.component';
import { WordComponent } from './components/word/word.component';
import { WordSubmitComponent } from './components/word-submit/word-submit.component';
import { KanjiSearchComponent } from './components/kanji-search/kanji-search.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hiragana', component: HiraganaComponent },
  { path: 'katakana', component: KatakanaComponent },
  { path: 'kanji', component: KanjiComponent },
  { path: 'kanji/search', component: KanjiSearchComponent },
  { path: 'words', component: WordComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
