import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CustomInputComponent } from "@app/ui/app-input/app-input.component";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    MatButtonModule,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  readonly router = inject(Router);
  readonly formLogin = inject(NonNullableFormBuilder).group({
    loginName: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  submitForm() {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) return;
    this.router.navigate(["manager"]).then();
  }

  ngOnInit(): void {}
}
