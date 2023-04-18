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
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hiragana', component: HiraganaComponent },
  { path: 'katakana', component: KatakanaComponent },
  { path: 'kanji', component: KanjiComponent },
  { path: 'kanji/submit', component: KanjiSubmitComponent },
  { path: 'kanji/search', component: KanjiSearchComponent },
  { path: 'words', component: WordComponent },
  { path: 'words/submit', component: WordSubmitComponent },
  { path: 'login', component: LoginComponent },
  { path: ':type/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
