import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { LoginComponent } from './components/login-component/login-component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/authinterceptor-interceptor';
import { AppRoutingModule } from './app-routing-module';
import { User } from './user/user';
import { Applayout } from './components/applayout/applayout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sidenav } from './components/sidenav/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Sports } from './components/sports/sports';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Dialogbox } from './components/dialogbox/dialogbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialog } from './components/delete-dialog/delete-dialog';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    User,
    Applayout,
    Sidenav,
    Sports,
    Dialogbox,
    DeleteDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
