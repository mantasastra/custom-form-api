import { BaseField } from "./BaseField";

type Choice = {
  id: string;
  value: boolean;
};

export class BooleanField extends BaseField {
  public choices: Choice[];

  constructor(title: string, description: string, required: boolean) {
    super("boolean", title, description, required);

    this.choices = [
      {
        id: "1",
        value: true,
      },
      {
        id: "2",
        value: false,
      },
    ];
  }
}
