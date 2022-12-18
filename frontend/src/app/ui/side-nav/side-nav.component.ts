import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: "app-side-nav",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatListModule],
  templateUrl: "./side-nav.component.html",
  styleUrls: ["side-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
