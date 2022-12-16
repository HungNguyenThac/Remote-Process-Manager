import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppGridComponent } from "@app/ui/app-grid/app-grid.component";
import { LetModule } from "@ngrx/component";

@Component({
  selector: "app-applications",
  standalone: true,
  imports: [CommonModule, AppGridComponent, LetModule],
  template: `<app-grid></app-grid>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
