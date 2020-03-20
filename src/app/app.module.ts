import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BooksTableComponent} from './books-table/books-table.component';
import {RouterModule, Routes} from '@angular/router';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookAddComponent} from './books-table/book-operations/book-save/book-save.component';
import {BasicAuthHttpInterceptorService} from './config/auth/basic-auth-http-interceptor.service';
import {FontWeightDirective} from './books-table/table-manipulations/font-weight.directive';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableButtonsComponent} from './books-table/table-buttons/table-buttons.component';
import {BookDetailsComponent} from './books-table/book-operations/book-details/book-details.component';
import {CardModule, SliderModule} from 'primeng';
import {HttpErrorInterceptor} from './config/error-handler/http-error.interceptor';
import {TableFilterComponent} from './books-table/table-filter/table-filter.component';
import {SortDictionaryCategoriesPipe} from './books-table/SortDictionaryCategories.pipe';

const routes: Routes = [
  {path: '', component: BooksTableComponent},
  {path: 'book-details', component: BookDetailsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    BooksTableComponent,
    BookAddComponent,
    FontWeightDirective,
    TableButtonsComponent,
    BookDetailsComponent,
    TableFilterComponent,
    SortDictionaryCategoriesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    CardModule,
    SliderModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
