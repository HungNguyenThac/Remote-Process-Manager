import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dialog",
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["confirm-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConfirmDialogComponent {
  readonly matDialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
}
