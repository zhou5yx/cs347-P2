import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LiveSessionComponent } from './live-session/live-session.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule,MatCheckboxModule,MatSelectModule, MatDialogModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { TaTableComponent } from './ta-table/ta-table.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { CalendarDayComponent } from './calendar/calendar-day/calendar-day.component';
import { EventDialogComponent } from './calendar/event-dialog/event-dialog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'session',      component: LiveSessionComponent },
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LiveSessionComponent,
    CalendarComponent,
    ProfileComponent,
    AdminComponent,
    TaTableComponent,
    CalendarDayComponent,
    EventDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule,
    MatTabsModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatSortModule,
    MatSelectModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    EventDialogComponent
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
