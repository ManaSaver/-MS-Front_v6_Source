import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SafeHtmlPipe } from "./pipes/safehtml.pipe";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ResourcesComponent } from './resources/resources.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { TinymceComponent } from './tinymce/tinymce.component';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import { ButtonComponent } from './reusable-elements/button/button.component';


@NgModule({
    declarations: [
        SafeHtmlPipe,
        AppComponent,
        CategoryComponent,
        ResourcesComponent,
        SearchComponent,
        EditComponent,
        CreateComponent,
        TinymceComponent,
        ButtonComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule, // <- add this
        HighlightModule,
        CodemirrorModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
          {
              provide: HIGHLIGHT_OPTIONS,
              useValue: {

                  coreLibraryLoader: () => import('highlight.js/lib/core'),
                  languages: {
                      typescript: () => import('highlight.js/lib/languages/typescript'),
                      js: () => import('highlight.js/lib/languages/javascript'),
                      css: () => import('highlight.js/lib/languages/css'),
                      xml: () => import('highlight.js/lib/languages/xml'),
                      html: () => import('highlight.js/lib/languages/xml'),
                      php: () => import('highlight.js/lib/languages/php'),
                      go: () => import('highlight.js/lib/languages/go'),
                      bash: () => import('highlight.js/lib/languages/bash'),
                      sql: () => import('highlight.js/lib/languages/sql'),

                  },
                  themePath: './assets/libs/highlight/styles/tomorrow-night-blue.min.css',

                 // themePath: './assets/libs/highlight/styles/base16/solarized-dark.min.css',
                  config: {
                      useBR: true
                  }

              }
          }
      ],
      bootstrap: [AppComponent]
})

export class AppModule { }
