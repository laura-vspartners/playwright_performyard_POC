import { test } from '../fixtures/base';
import { loadCSV } from '../utils/csvLoader';

// Shared constants
const GOAL_NAME_ERROR = 'String must contain at least 4 character(s)';
const TARGET_DEFAULT_VALUE = '100';
const GOAL_WEIGHT = '80';
const GOAL_DESCRIPTION = 'This is a test goal description';

// Load test cases from CSV files
const goalNameValidationCases = loadCSV('../fixtures/testData/goalNameValidation.csv');
const dateValidationCases = loadCSV('../fixtures/testData/dateValidation.csv');
const targetValidationCases = loadCSV('../fixtures/testData/targetValidation.csv');

// Validate Goal name field
test.describe('Goal Name Field Validation', () => {
  for (const { goalName, description } of goalNameValidationCases) {
    test(`Test Goal Name: ${description}`, async ({ createGoalPage }) => {
      await createGoalPage.goToCreategGoalPage();
      await createGoalPage.fillGoalForm(
        goalName,
        TARGET_DEFAULT_VALUE,
        GOAL_DESCRIPTION,
        GOAL_WEIGHT
      );
      await createGoalPage.submitNewGoal();
      await createGoalPage.verifyMessageErrorIsDisplayed(GOAL_NAME_ERROR);
    });
  }
});

//Validate start and due date fields
test.describe('Date Validation', () => {
  for (const { startDate, dueDate, description, expectedError } of dateValidationCases) {
    test(`Test Date Validation: ${description}`, async ({ createGoalPage }) => {
      await createGoalPage.goToCreategGoalPage();
      await createGoalPage.fillGoalForm(
        `Automation_test_Goal_${Date.now()}`,
        TARGET_DEFAULT_VALUE,
        GOAL_DESCRIPTION,
        GOAL_WEIGHT,
        startDate,
        dueDate
      );
      await createGoalPage.submitNewGoal();
      await createGoalPage.verifyMessageErrorIsDisplayed(expectedError);
    });
  }
});

// Validate target field
test.describe('Target Field Validation', () => {
  test('Verify Target field default value', async ({ createGoalPage }) => {
    await createGoalPage.goToCreategGoalPage();
    await createGoalPage.verifyTargetDefaultValue();
  });

  for (const { input, description, expectedError } of targetValidationCases) {
    test(`Validate constraints on Target field inputs: ${description}`, async ({ createGoalPage }) => {
      await createGoalPage.goToCreategGoalPage();
      await createGoalPage.fillGoalForm(
        `Automation_test_Goal_${Date.now()}`,
        input,
        GOAL_DESCRIPTION,
        GOAL_WEIGHT
      );
      await createGoalPage.submitNewGoal();
      await createGoalPage.verifyMessageErrorIsDisplayed(expectedError);
    });
  }
});
