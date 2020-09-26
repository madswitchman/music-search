import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistBioComponent } from './artist-bio.component';

describe('ArtistBioComponent', () => {
  let component: ArtistBioComponent;
  let fixture: ComponentFixture<ArtistBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
