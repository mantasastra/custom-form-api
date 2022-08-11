import { BaseField } from "./BaseField";

type Choice = {
  id: string;
  value: string;
};

export class SingleSelectDropdownField extends BaseField {
  public choices: Choice[];

  constructor(
    title: string,
    description: string,
    required: boolean,
    choices: Choice[]
  ) {
    super("singleSelectDropdown", title, description, required);

    this.choices = choices;
  }

  public addChoice(choice: Choice) {
    this.choices.push(choice);
  }

  public removeChoice(choiceId: string) {
    this.choices.splice(
      this.choices.findIndex(({ id }) => {
        return id === choiceId;
      }),
      1
    );
  }

  public updateChoice(newChoice: Choice) {
    this.choices.forEach((choice) => {
      if (choice.id === newChoice.id) {
        choice.value = newChoice.value;
      }
    });
  }
}
