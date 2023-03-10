import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
declare let alertify: any;
@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,

    private cardService: CardService,
    private dialogRef: MatDialogRef<CardModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [
        this.data?.title || '',
        [Validators.required, Validators.maxLength(255)],
      ],
      phone: [
        this.data?.phone || '',
        [Validators.required, Validators.maxLength(20)],
      ],
      email: [
        this.data?.email || '',
        [Validators.email, Validators.maxLength(50)],
      ],
      address: [this.data?.address || '', Validators.maxLength(255)],
    });
  }

  addCard(): void {
    this.showSpinner = true;
    console.log(this.cardForm.value);
    this.cardService.addCard(this.cardForm.value).subscribe((res: any) => {
      this.getSuccess("eklendi!")
    },(err:any)=>{
      this.getError('Ekleme "HATA')
    });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.data.id).subscribe((res: any) => {
      this.getSuccess("guncellendi.")
    });
  }
  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id).subscribe((res: any) => {
      this.getSuccess("silindi!")
    });
  }

  getSuccess(message: string) {
    alertify.success(message);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }
  getError(message:string){
    alertify.warning(message);
    this.showSpinner = false;
  }
}
