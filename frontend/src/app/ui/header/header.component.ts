import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: "./header.component.html",
  styles: [
    `
      :host {
        .header-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: chocolate;
          margin: 0 12px;
          border-radius: 0 0 12px 12px;
          padding: 0 12px;
          height: 76px;
          .header-content {
            font-size: 32px;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  readonly router = inject(Router);

  ngOnInit(): void {}

  logout() {
    this.router.navigateByUrl("procman/login").then((rs) => console.log(rs));
  }
}
