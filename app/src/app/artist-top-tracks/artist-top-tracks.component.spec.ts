import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTopTracksComponent } from './artist-top-tracks.component';

describe('ArtistTopTracksComponent', () => {
  let component: ArtistTopTracksComponent;
  let fixture: ComponentFixture<ArtistTopTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistTopTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistTopTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
