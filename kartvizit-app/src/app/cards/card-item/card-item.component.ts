import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() card!: Card;

  constructor(private dialog: MatDialog) {}

  openUpdateCardModal(): void {
    this.dialog.open(CardModalComponent, {
      width: '400px',
      data: this.card,
    });
  }
}
