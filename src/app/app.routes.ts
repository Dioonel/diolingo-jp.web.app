import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import ('@components/home/home.component').then(m => m.HomeComponent) },
  { path: 'hiragana', loadComponent: () => import ('@components/hiragana/hiragana.component').then(m => m.HiraganaComponent) },
  { path: 'katakana', loadComponent: () => import ('@components/katakana/katakana.component').then(m => m.KatakanaComponent) },
  { path: 'kanji', loadComponent: () => import ('@components/kanji/kanji.component').then(m => m.KanjiComponent) },
  { path: 'words', loadComponent: () => import ('@components/word/word.component').then(m => m.WordComponent) },
  { path: 'login', loadComponent: () => import ('@components/login/login.component').then(m => m.LoginComponent) },
  { path: 'play', loadComponent: () => import ('@components/play/play.component').then(m => m.PlayComponent) },
  { path: 'play/guess', loadComponent: () => import ('@components/guess/guess.component').then(m => m.GuessComponent) },
  { path: 'play/pairs', loadComponent: () => import ('@components/pairs/pairs.component').then(m => m.PairsComponent) },
  { path: 'stats', loadComponent: () => import ('@components/stats/stats.component').then(m => m.StatsComponent) }
];
