import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "calcPositionColumnTable",
  standalone: true,
})
export class CalcPositionColumnTablePipe implements PipeTransform {
  transform(value: number | string, ...args: unknown[]): number | string {
    if (typeof value === "string") return value;
    value += 1;
    return value;
  }
}
