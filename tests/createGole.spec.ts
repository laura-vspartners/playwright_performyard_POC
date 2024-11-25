import { expect, test } from '@playwright/test';
import { GoalPage } from '../pages/createGolePage';

test.describe('Create Goal Tests', () => {
  const goalNameError = 'String must contain at least 4 character(s)';
  const targetDefaultValue = '100';
  const testCasesForGoalNameValidation = [
    { goalName: '', description: 'Empty goal name' },
    { goalName: 'a', description: 'Single character' },
    { goalName: 'ab', description: 'Two characters' },
    { goalName: 'abc', description: 'Three characters' },
    { goalName: '#$%', description: 'Three special characters' },
    { goalName: '12$', description: 'Special characters and numbers' },
  ];

  const testCasesForDates = [
    { startDate: '11/25/2024', dueDate: '11/24/2024', description: 'Due Date before Start Date', expectedError: 'The start date must be before the due date' },
    { startDate: '11/25/2024', dueDate: '11/25/2024', description: 'Due Date equals Start Date', expectedError: 'The start date must be before the due date' },
    { startDate: '', dueDate: '11/26/2024', description: 'Empty Start Date', expectedError: 'Start Date must have a value' },
    { startDate: '', dueDate: '', description: 'Empty Start and Due Date', expectedError: 'Start Date must have a value' },
  ];

  const targetTestCases = [
    { input: '-10', description: 'Negative target value', expectedError: 'Target value cannot be negative' },
    { input: '1000000000000', description: 'Large number target value', expectedError: 'Target value is too large' },
    { input: 'abc', description: 'Characters target inserted', expectedError: 'Target value must be a number' },
    { input: '', description: 'Empty target value', expectedError: 'Not a valid number' },
  ];

  test.describe('Goal Name Field Validation', () => {
    for (const { goalName, description } of testCasesForGoalNameValidation) {
      test(`Test Goal Name: ${description}`, async ({ page }) => {
        const goalPage = new GoalPage(page);
        await goalPage.goToCreategGoalPage();

        await goalPage.fillGoalForm(goalName, targetDefaultValue, 'This is a test goal description', '100');
        await goalPage.submitNewGoal();

        await goalPage.verifyMessageErrorIsDisplayed(goalNameError);
      });
    }
  });

  test.describe('Date Validation', () => {
    for (const { startDate, dueDate, description, expectedError } of testCasesForDates) {
      test(`Test Date Validation: ${description}`, async ({ page }) => {
        const goalPage = new GoalPage(page);
        await goalPage.goToCreategGoalPage();

        await goalPage.fillGoalForm(
          `Automation_test_Goal_${Date.now()}`,
          targetDefaultValue,
          'This is a test goal description',
          '100',
          startDate,
          dueDate
        );

        await goalPage.submitNewGoal();
        await goalPage.verifyMessageErrorIsDisplayed(expectedError);
      });
    }
  });

  test.describe('Target Field Validation', () => {
    test('Verify Target field default value', async ({ page }) => {
      const goalPage = new GoalPage(page);
      await goalPage.goToCreategGoalPage();

      await goalPage.verifyTargetDefaultValue();
    });

    for (const { input, description, expectedError } of targetTestCases) {
      test(`Validate constraints on Target field inputs: ${description}`, async ({ page }) => {
        const goalPage = new GoalPage(page);
        await goalPage.goToCreategGoalPage();

        await goalPage.fillGoalForm(
          `Automation_test_Goal_${Date.now()}`,
          input,
          'This is a test goal description',
          '100'
        );

        await goalPage.submitNewGoal();
        await goalPage.verifyMessageErrorIsDisplayed(expectedError);
      });
    }
  });
});
