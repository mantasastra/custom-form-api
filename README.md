# POC Custom Form API

## Short description

This is a proof of concept (POC) for a limited custom form API (like Google Forms). This API allows to define, send and submit custom forms.

Since it's a POC, I have used TypeScript with object-oriented design. The API refers to objects and methods that interact with each other.

## How to run the demo

I have created a demo which shows how this POC works. The demo does the following things:

- Creates a form
- Creates fields and adds them to the form
- Sends the form to the email
- Creates a submission and submits it

Two things need to be done before running the demo:

1. Install all the dependencies by running `npm install` in the terminal
2. Run `npm run start:demo` in the terminal

## Approach

I have approached this challenge in the following way:

1. Researched how the forms are built by other companies (e.g. Google, Typeform) to have a better understanding of the problem and see how it is currently solved.
2. Fleshed out the requirements in the "Requirements" section below from both the challenge page and any additional requirements that I thought would be needed for this POC.
3. Started thinking about the data structure, how it will look, and how different data will interact with one another and documented my design decisions in the "Design Decisions" section below during the implementation of the POC.
4. Implemented proof of concept by using TypeScript with object-oriented design.
5. Once reaching the end of time, I've added future considerations that I thought would need to be done in the future.

## Requirements

- The form should have a unique id, a title, a description, a status, submission count and target, a list of fields (i.e. questions), a list of submissions and a date when it was submitted;
- The form should support the following fields:
  - Plain text field
  - Email text field
  - Single select dropdown field
  - Boolean field (Yes/No)
  - File field;
- Each field should have an id, a type, a title, a description, an indication of whether it is required, available choices (applicable to boolean and single select dropdown fields), submitted answers, an indication of whether it is visible and conditional logic;
- Any field should have the ability to be a conditional field. Conditional fields can only be triggered (i.e. become visible) if a previous field has a specific value;
- Only a single select dropdown field and boolean field can trigger a conditional field;
- Each submission should have a unique id, a status, recipient email address, a list of fields with selected answers, a date when it was sent to the recipient and the date when it was submitted by the recipient;
- The order of the fields shown to the user is the same as the order of the field in the forms field list;
- The form should have the functionality to be created;
- The form should have the functionality to be sent to the user;
- The form should have the functionality to be submitted by the user.

## Design Decisions

### Fields
- I have created a base field model that other types of fields can extend. This way new fields can be easily created and adjusted as needed with minimal impact on the base field.
- When thinking about conditional fields, I was questioning where to put the conditional logic. At first, I thought it could be put inside the form (i.e. as a list of conditional logic) but then I decided to put it inside a field because it would be easier from the frontend development perspective since only a previous field can trigger a conditional field. This would not work if any field no matter the order in the form could trigger a conditional field.
- I was also thinking about how the fields (i.e. questions) will be shown in the form. I decided to stick to the order in which they are in the list of fields (i.e. array) to make it easier for developers.
- When defining the data structure for conditional fields, I tried to make it as generic as possible. This is to allow the addition of new conditional logic in the future (e.g. show the field based on any fields rather than just a previous field)
- Each field has a visibility flag inside. If a field has a condition then it will be hidden. If the condition is met, the field will be made visible. For now, we only use one type of condition but the code still checks the type, visibility and type of operator before making the field visible.
- Currently, the fields don't have any validation. For this POC I assumed that the user will always enter the correct data. However, once this API is built as a real feature, the validation of fields will be a must requirement.
- For boolean type fields I did not add any labels in the choices to make it a bit more generic. This would allow this field to be used in the frontend in a few different ways: as a Yes/No or True/False question.
- Currently, both the email text field and plain text field look the same. This is intentional. These fields would change once the validation is added to them. For example, for the email field, we would validate that the answer is an email and for the plain text field we could add validation for max characters or something else.
- For the file field, I assumed that once a file is added the backend will generate an URL for this field. At the moment  no code does that but would need to be written in the future. Also, I did not add any limits on the file type. This could be added if needed during the validation of the field. I also assumed that multiple files can be added as there might be situations in the future where the user would like to add more than one file.
- When defining the data structure for the fields answer, I assumed that there will be no multiple choice fields. Because of that, a field can only have a single answer. However, if multiple choice fields would need to be supported then this answer data structure would need to change to support multiple answers. This will be different for a file field.
- I decided to support multiple files for a file field so the answer will always be null for it. To find out the submitted files, we would need to look at the files array which contains objects with the file URLs. I did it this way because I wanted to keep the file information in the same place (e.g. file type, size, URL)

### Form
- For now, I made the sending of the form work by email only. There is no code that sends the form to an email. What I did instead, I assumed that it does send it and then update the required data in the form to flag that this form has been sent. Also, when a form is sent to an email, a pending submission is created in the form so that we can track to which users the form was sent but has not been submitted yet.
- I decided to have a submission limit. This means that the user can define how many submissions they want and once the limit is reached, the form will no longer accept any new submissions. The status of the form will also change to completed. This is an intentional decision but could be changed based on the business needs.
- Since the form can be submitted multiple times until a submission limit is reached, I decided to create a new list of submission fields. A submission contains an id, a status, the date it was submitted and all the fields of the form with the answers. Once the form is sent, a new submission is created with a pending status and fields without answers. When an actual submission is done then the status changes to completed and fields are populated with the answers. While this is not the most efficient way to store the answers due to data duplication, I made it this way because I was reaching the time limit for the challenge.

## Future Considerations

- Because I was reaching the end of the 3-hour limit for this challenge, I did not add the functionality to update the field. This would need to be added in the future and it could be either a PUT or a PATCH request. There can also be both requests: partial and full updates.
- Sending of the form could be expanded further to support sharing of the form by an URL link.
- The submission fields would need some more work. Instead of duplicating the field data inside each of the submissions, we could reference the id of the field with the answer. This way the frontend could use the id to find the field information when needed. We would also avoid data duplication this way.
- Since this is a POC, I did not add any tests. However, for a real application tests are crucial. If this API would be built as a real API then at least the following would need to be tested to gain full confidence in the solution:
  - Each field and its methods (could be tested with unit tests)
  - Creating a form (could be tested with integration tests)
  - Adding fields to a form (could be tested with integration tests)
  - Sending the form (could be tested with e2e tests)
  - Submitting the form (could be tested with e2e or integration test)
- More field types would need to be added for a real API to compete with other such APIs. At least the following fields would need to be supported:
  - Multi-select field
  - Rating field (from 0 to 10)
  - Ranking field
  - Date field
  - Number field
- A real API would definitely use a database to make sure all the data is saved. Because we want this API to be scalable (i.e. support more types in the future) and performant, I would suggest using a non-relational database for this. Such databases offer high performance and availability. Plus, a flexible schema helps in storing data with varied types that can be changed without major schema changes.
