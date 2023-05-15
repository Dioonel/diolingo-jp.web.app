import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from '@angular/cdk/dialog';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HiraganaComponent } from './components/hiragana/hiragana.component';
import { KatakanaComponent } from './components/katakana/katakana.component';
import { KanjiComponent } from './components/kanji/kanji.component';
import { KanjiSubmitComponent } from './components/kanji-submit/kanji-submit.component';
import { LoginComponent } from './components/login/login.component';
import { MyInterceptor } from './interceptors/interceptor.interceptor';
import { WordSubmitComponent } from './components/word-submit/word-submit.component';
import { GridComponent } from './components/grid/grid.component';
import { WordComponent } from './components/word/word.component';
import { NavComponent } from './components/nav/nav.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HiraganaComponent,
    KatakanaComponent,
    KanjiComponent,
    KanjiSubmitComponent,
    LoginComponent,
    WordSubmitComponent,
    GridComponent,
    WordComponent,
    NavComponent,
    DialogComponent,
    EditFormComponent,
    SearchComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DialogModule,
    CdkAccordionModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
