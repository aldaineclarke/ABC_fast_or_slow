import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-confirmation',
  templateUrl: './leave-confirmation.component.html',
  styleUrls: ['./leave-confirmation.component.scss']
})
export class LeaveConfirmationComponent {

    dialogRef = inject(MatDialogRef)
    closeModal(shouldLeave=false){
      this.dialogRef.close(shouldLeave)
    }
}
