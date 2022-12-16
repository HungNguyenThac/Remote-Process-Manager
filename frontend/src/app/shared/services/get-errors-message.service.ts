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
    const message = this.objectMessages[key].replace(
      "#FieldName#",
      fieldControlName,
    );
    return message;
  };
}

export const injectErrorMessageService = () => {
  return inject(ErrorMessages);
};
