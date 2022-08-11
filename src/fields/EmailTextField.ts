import { BaseField } from "./BaseField"

export class EmailTextField extends BaseField {
  constructor(title: string, description: string, required: boolean) {
    super("emailText", title, description, required);
  }
}
