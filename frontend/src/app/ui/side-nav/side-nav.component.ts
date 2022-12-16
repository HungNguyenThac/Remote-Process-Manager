import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: "app-side-nav",
  standalone: true,
  imports: [CommonModule, MatListModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: "./side-nav.component.html",
  styleUrls: ["side-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
