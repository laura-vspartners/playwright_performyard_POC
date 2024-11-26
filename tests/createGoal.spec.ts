import { test } from '../fixtures/base';
import { loadCSV } from '../utils/csvLoader';

// Shared constants
const GOAL_NAME_ERROR = 'String must contain at least 4 character(s)';
const TARGET_DEFAULT_VALUE = '100';
const GOAL_WEIGHT = '80';
const GOAL_DESCRIPTION = 'This is a test goal description';
const DEFAULT_GOAL = 'Corporate';
const DEFAULT_ASSIGNEE = 'Jenny Sherman';

// Load test cases from CSV files
const goalNameValidationCases = loadCSV('../fixtures/testData/goalNameValidation.csv');
const dateValidationCases = loadCSV('../fixtures/testData/dateValidation.csv');
const targetValidationCases = loadCSV('../fixtures/testData/targetValidation.csv');

// Validate Goal name field
test.describe('Goal Name Field Validation', () => {
  for (const { goalName, description } of goalNameValidationCases) {
    test(`Test Goal Name: ${description}`, async ({ createGoalPage }) => {
      await createGoalPage.goToCreategGoalPage();
      await createGoalPage.fillGoalForm({
        goalName,
        target: TARGET_DEFAULT_VALUE,
        description: GOAL_DESCRIPTION,
        goalWeight: GOAL_WEIGHT,
        goalCategory: DEFAULT_GOAL,
        assignee: DEFAULT_ASSIGNEE
      });
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
      await createGoalPage.fillGoalForm({
        goalName: `Automation_test_Goal_${Date.now()}`,
        target: TARGET_DEFAULT_VALUE,
        description: GOAL_DESCRIPTION,
        goalWeight: GOAL_WEIGHT,
        goalCategory: DEFAULT_GOAL,
        assignee: DEFAULT_ASSIGNEE,
        startDate,
        dueDate
      });
      await createGoalPage.submitNewGoal();
      await createGoalPage.verifyMessageErrorIsDisplayed(expectedError);
    });
  }
});

// Validate target field
test.describe('Target Field Validation', () => {
  test('Verify Target field default value', async ({ createGoalPage }) => {
    await createGoalPage.goToCreategGoalPage();
    await createGoalPage.verifyTargetDefaultValueAndType();
  });

  for (const { input, description, expectedError } of targetValidationCases) {
    test(`Validate constraints on Target field inputs: ${description}`, async ({ createGoalPage }) => {
      await createGoalPage.goToCreategGoalPage();
      await createGoalPage.fillGoalForm({
        goalName: `Automation_test_Goal_${Date.now()}`,
        target: input,
        description: GOAL_DESCRIPTION,
        goalWeight: GOAL_WEIGHT,
        goalCategory: DEFAULT_GOAL,
        assignee: DEFAULT_ASSIGNEE
      });
      await createGoalPage.submitNewGoal();
      await createGoalPage.verifyMessageErrorIsDisplayed(expectedError);
    });
  }
});

// Validate goal creation flow
test.describe('Goal creation flow', () => {
  test('Verify user can create a new goal without advanced options', async ({ createGoalPage }) => {
    await createGoalPage.goToCreategGoalPage();
    await createGoalPage.verifyTargetDefaultValueAndType();
    await createGoalPage.fillGoalForm({
      goalName: `Automation_test_Goal_${Date.now()}`,
      target: TARGET_DEFAULT_VALUE,
      description: GOAL_DESCRIPTION,
      goalWeight: GOAL_WEIGHT,
      goalCategory: DEFAULT_GOAL,
      assignee: DEFAULT_ASSIGNEE
    });
    await createGoalPage.submitNewGoal();
    await createGoalPage.verifyGoalCreationSuccess();
  });
  test('Verify user can create a new top organizational goal using advanced options', async ({ createGoalPage }) => {
    await createGoalPage.goToCreategGoalPage();
    await createGoalPage.verifyTargetDefaultValueAndType();
    await createGoalPage.fillGoalForm({
      goalName: `Automation_test_Goal_${Date.now()}`,
      target: TARGET_DEFAULT_VALUE,
      description: GOAL_DESCRIPTION,
      goalWeight: GOAL_WEIGHT,
      goalCategory: DEFAULT_GOAL,
      assignee: DEFAULT_ASSIGNEE,
      advanced: true,
      setAsTopLevelOrgGoal: true,
      goalChecklist: 'Team'
    });
    await createGoalPage.submitNewGoal();
    await createGoalPage.verifyGoalCreationSuccess();
  });
});
