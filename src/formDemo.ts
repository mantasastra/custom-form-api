import cloneDeep from "lodash.clonedeep";
import {
  BooleanField,
  EmailTextField,
  FileField,
  PlainTextField,
  SingleSelectDropdownField,
} from "./fields";
import { File } from "./fields/FileField";
import { Form, Field } from "./Form";

function seedFormFields(form: Form) {
  const singleSelectChoices = [
    {
      id: "1",
      value: "apple",
    },
    {
      id: "2",
      value: "orange",
    },
  ];
  const singleSelectField = new SingleSelectDropdownField(
    "What is your favourite fruit?",
    "",
    true,
    singleSelectChoices
  );

  // Conditional field
  const booleanField = new BooleanField(
    "Could you live without oranges?",
    "",
    false
  );
  booleanField.addCondition("is", "orange");

  const emailField = new EmailTextField("What is your email?", "", true);
  const plainTextField = new PlainTextField(
    "Please tell us a bit about yourself",
    "",
    true
  );
  const fileField = new FileField("Please upload a picture of a cat", "", true);

  form.addField(singleSelectField);
  form.addField(booleanField);
  form.addField(emailField);
  form.addField(plainTextField);
  form.addField(fileField);
}

function completeForm(form: Form, answers: any) {
  const submissionFields: Field[] = cloneDeep(form.fields);

  submissionFields[0].answer = answers.first;

  if (answers.second) {
    submissionFields[1].checkCondition(submissionFields[0].answer as string);
    submissionFields[1].answer = answers.second;
  }

  submissionFields[2].answer = answers.third;
  submissionFields[3].answer = answers.fourth;

  const file: File = {
    id: "1",
    type: "png",
    size: 10000,
    url: answers.fifth,
  };
  // @ts-ignore
  submissionFields[4].addFile(file);

  form.submitForm(submissionFields);
}

function runDemo() {
  const form = new Form("Custom Form", "This is a test form", 2);
  console.log("1️⃣ Form created", form);

  seedFormFields(form);
  console.log("2️⃣ Form fields added", form);

  form.sendForm("joe@doe.com");
  console.log("3️⃣ Form sent to the first user", form);

  completeForm(form, {
    first: "apple",
    third: "joe@doe.com",
    fourth: "I am Joe",
    fifth: "http://localhost:3000",
  });
  console.log("5️⃣ Form submitted by the first user", form);
  console.log(
    "5️⃣ Form submission data after first submission",
    form.submissionFields[0]
  );

  form.sendForm("doe@joe.com");
  console.log("6️⃣ Form sent to the second user", form);

  completeForm(form, {
    first: "orange",
    second: true,
    third: "doe@joe.com",
    fourth: "I am Doe",
    fifth: "http://localhost:3001",
  });
  console.log("7️⃣ Form submitted by the second user", form);
  console.log(
    "7️⃣ Form submission data after second submission",
    form.submissionFields[0]
  );
}

runDemo();
