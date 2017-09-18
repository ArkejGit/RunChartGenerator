import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { SearchPipe } from './pipes/search.pipe';
import { RunNamePipe } from './pipes/run-name.pipe';

import { ModalContent } from './modalContent/modal-content.component';

import { GetDataService } from './services/get-data.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    RunNamePipe,
    ModalContent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent],
  entryComponents:[ ModalContent ]
})
export class AppModule { }
