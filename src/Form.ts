import { v4 as uuid } from "uuid";
import {
  BooleanField,
  EmailTextField,
  FileField,
  PlainTextField,
  SingleSelectDropdownField,
} from "./fields";

type Status = "draft" | "active" | "completed" | "closed";

export type Field =
  | SingleSelectDropdownField
  | BooleanField
  | EmailTextField
  | FileField
  | PlainTextField;

type SubmissionField = {
  id: string;
  status: "pending" | "completed";
  email: string;
  fields: Field[];
  sentAt: Date | null;
  submittedAt: Date | null;
};

export class Form {
  public id: string;
  public title: string;
  public description: string;
  public status: Status;
  public fields: Field[];
  public submissionFields: SubmissionField[];
  public submissionCount: number;
  public submissionTarget: number;
  public completedAt: Date | null;

  constructor(title: string, description: string, submissionTarget: number) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.status = "draft";
    this.fields = [];
    this.submissionFields = [];
    this.submissionCount = 0;
    this.submissionTarget = submissionTarget;
    this.completedAt = null;
  }

  public addField(field: Field) {
    this.fields.push(field);
  }

  public removeField(fieldId: string) {
    this.fields.splice(
      this.fields.findIndex(({ id }) => {
        return id === fieldId;
      }),
      1
    );
  }

  public sendForm(recipientEmail: string) {
    // Assume here that the form was sent to the email

    const submissionField: SubmissionField = {
      id: uuid(),
      status: "pending",
      email: recipientEmail,
      fields: this.fields,
      sentAt: new Date(),
      submittedAt: null,
    };

    this.submissionFields.push(submissionField);
    this.status = "active";
  }

  public submitForm(fields: Field[]) {
    if (this.submissionCount < this.submissionTarget) {
      this.submissionFields.find((submission) => {
        submission.fields = fields;
        submission.status = "completed";
        submission.submittedAt = new Date();
      });

      this.submissionCount++;
    }

    if (this.submissionCount >= this.submissionTarget) {
      this.status = "completed";
      this.completedAt = new Date();
    }
  }

  public closeForm() {
    this.status = "closed";
  }
}
