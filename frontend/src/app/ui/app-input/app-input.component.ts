import { Component, Input, NgZone, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { injectErrorMessageService } from "@shared/services/get-errors-message.service";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-input",
  standalone: true,
  templateUrl: "app-input.component.html",
  styles: [
    `
      :host {
        .input-container {
          width: 100%;
        }
      }
    `,
  ],
  imports: [ReactiveFormsModule, NgClass, NgIf, MatInputModule],
  providers: [],
})
export class CustomInputComponent implements OnInit {
  errorsMessageService = injectErrorMessageService();
  @Input() fieldContainerClass: string | string[] = "";
  @Input() fieldClass: string | string[] = "";

  @Input() fieldGroup!: FormGroup;
  @Input() label: string = "";
  @Input() fieldControlName: string = "";
  @Input() fieldType: string = "text";

  @Input() fieldControl!: AbstractControl;

  invalidField = false;
  errorMessage = "";

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getErrorMessage();
  }

  inputEvent() {
    this.getErrorMessage();
  }

  private getErrorMessage = () => {
    this.ngZone.runOutsideAngular(() => {
      for (const key of Object.keys(
        this.fieldGroup.get(this.fieldControlName)?.errors || {},
      )) {
        if (key) {
          this.invalidField = true;
          this.errorMessage = this.errorsMessageService.getErrorMessage(
            key,
            this.label,
          );
          break;
        }
        this.invalidField = false;
      }
    });
  };
}
