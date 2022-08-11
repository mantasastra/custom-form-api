import { BaseField } from "./BaseField";

export class PlainTextField extends BaseField {
  constructor(title: string, description: string, required: boolean) {
    super("plainText", title, description, required);
  }
}
