import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "@app/ui/header/header.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SideNavComponent } from "@app/ui/side-nav/side-nav.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatSidenavModule,
    SideNavComponent,
    RouterOutlet,
  ],
  templateUrl: "./layout.component.html",
  styleUrls: ["layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
