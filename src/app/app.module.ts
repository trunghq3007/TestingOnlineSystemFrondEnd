import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    DashboardComponent,
    ViewListQuestionComponent,
    CreateQuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CKEditorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  public Editor = ClassicEditor;

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

}


