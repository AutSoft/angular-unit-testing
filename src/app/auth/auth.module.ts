import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LOCAL_STORAGE } from './local-storage.token';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: AuthService, useClass: AuthService },
    { provide: LOCAL_STORAGE, useValue: localStorage },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class AuthModule {}
