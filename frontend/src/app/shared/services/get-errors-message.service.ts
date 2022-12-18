import { inject, Injectable } from "@angular/core";

export interface Object {
  [key: string]: string;
}

@Injectable({
  providedIn: "root",
})
export class ErrorMessages {
  private objectMessages: Object = {
    required: "#FieldName# không được bỏ trống",
    email: "#FieldName# không đúng định dạng email",
    minlength: "#FieldName# phải lớn hơn 6 ký tự",
  };
  getErrorMessage = (key: string, fieldControlName: string) => {
    return this.objectMessages[key].replace("#FieldName#", fieldControlName);
  };
}

export const injectErrorMessageService = () => {
  return inject(ErrorMessages);
};
