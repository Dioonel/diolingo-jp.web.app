import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HiraganaComponent } from './components/hiragana/hiragana.component';
import { KatakanaComponent } from './components/katakana/katakana.component';
import { KanjiComponent } from './components/kanji/kanji.component';
import { KanjiSubmitComponent } from './components/kanji-submit/kanji-submit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HiraganaComponent,
    KatakanaComponent,
    KanjiComponent,
    KanjiSubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
