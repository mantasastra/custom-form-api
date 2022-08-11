import { v4 as uuid } from "uuid";

type FieldType =
  | "plainText"
  | "singleSelectDropdown"
  | "emailText"
  | "boolean"
  | "file";

type Operator = "is" | "isNot";

type ConditionType = "previousAnswer";

export type Condition = {
  type: ConditionType;
  operator: Operator;
  value: string; // value to check for
};

export class BaseField {
  public id: string;
  public type: FieldType;
  public title: string;
  public description: string;
  public required: boolean;
  public isVisible: boolean;
  public answer: string | null;
  public condition: Condition | null;

  constructor(
    type: FieldType,
    title: string,
    description: string,
    required: boolean
  ) {
    this.id = uuid();
    this.type = type;
    this.title = title;
    this.description = description;
    this.required = required;
    this.isVisible = true;
    this.answer = null;
    this.condition = null;
  }

  public addAnswer(answer: string) {
    this.answer = answer;
  }

  public addCondition(operator: Operator, value: string) {
    const condition = {
      type: "previousAnswer" as ConditionType,
      operator,
      value,
    };

    this.condition = condition;
    this.isVisible = false;
  }

  public checkCondition(prevAnswer: string) {
    if (this.condition) {
      const { type, operator, value } = this.condition;

      if (type === "previousAnswer" && this.isVisible === false) {
        if (operator === "is" && prevAnswer === value) {
          this.isVisible = true;
        }

        if (operator === "isNot" && prevAnswer !== value) {
          this.isVisible = true;
        }
      }
    }
  }
}
