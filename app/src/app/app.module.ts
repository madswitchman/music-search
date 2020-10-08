//Angular Framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchComponent } from './search/search.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { ArtistTopTracksComponent } from './artist-top-tracks/artist-top-tracks.component';

//Services
import { SearchService } from './services/search.service';

//Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ArtistBioComponent } from './artist-bio/artist-bio.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchComponent,
    ArtistDetailsComponent,
    TrackDetailsComponent,
    ArtistBioComponent,
    ArtistTopTracksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatRippleModule,
    MatExpansionModule,
    MatDialogModule,
    NgxAudioPlayerModule,
    MatTooltipModule,
    RouterModule.forRoot([{ path: '**', component: SearchComponent }]),
  ],
  exports: [MatFormFieldModule, MatInputModule],
  providers: [SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
