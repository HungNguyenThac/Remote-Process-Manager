import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LetModule } from "@ngrx/component";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [CommonModule, LetModule],
  templateUrl: "./loading.component.html",
  styles: [
    `
      :host {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .dots {
          width: 4.2em;
          height: 4.2em;
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          grid-template-columns: repeat(3, 1fr);
          justify-items: center;
          align-items: center;
        }

        .dots > div {
          width: 0.866667em;
          height: 0.866667em;
          background-color: #ff0000;
          border-radius: 50%;
          animation: fade 1s alternate ease-in-out infinite;
        }

        .dots > div:nth-of-type(2),
        .dots > div:nth-of-type(4) {
          animation-delay: 0.25s;
        }

        .dots > div:nth-of-type(3),
        .dots > div:nth-of-type(5),
        .dots > div:nth-of-type(7) {
          animation-delay: 0.5s;
        }

        .dots > div:nth-of-type(6),
        .dots > div:nth-of-type(8) {
          animation-delay: 0.75s;
        }

        .dots > div:nth-of-type(9) {
          animation-delay: 1s;
        }

        @keyframes fade {
          to {
            opacity: 0.2;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
