import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header/header.component';
import { DropdownDirective } from 'src/shared/dropdown.directive';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmailComponent } from './components/modals/email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    RegistrationComponent,
    SidebarComponent,
    ProfileComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatRadioModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
