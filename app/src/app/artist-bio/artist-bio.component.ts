import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-artist-bio',
  templateUrl: './artist-bio.component.html',
  styleUrls: ['./artist-bio.component.scss'],
})
export class ArtistBioComponent implements OnInit {
  loading: boolean;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArtistBioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
