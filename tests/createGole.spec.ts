import { test } from '@playwright/test';
import { GoalPage } from '../pages/createGolePage';


test.describe('Create Goal Tests', () => {
  const goalNameError = 'String must contain at least 4 character(s)';
  const testCasesForGoalNameValidation = [
    { goalName: '', description: 'Empty goal name' },
    { goalName: 'a', description: 'Single character' },
    { goalName: 'ab', description: 'Two characters' },
    { goalName: 'abc', description: 'Three characters' },
    { goalName: '#$%', description: 'Three special characters' },
    { goalName: '12$', description: 'Special characters and numbers' },
  ];

  const testCasesForDates = [
    { startDate: '25/11/2024', dueDate: '24/11/2024', description: 'Due Date before Start Date', expectedError:'The start date must be before the due date' },
    { startDate: '25/11/2024', dueDate: '25/11/2024', description: 'Due Date equals Start Date', expectedError:'The start date must be before the due date' },
    { startDate: '', dueDate: '26/11/2024', description: 'Empty Start Date', expectedError: 'Start Date must have a value' },
    { startDate: '', dueDate: '', description: 'Empty Start and End Date', expectedError: 'Start Date must have a value'},
  ];

  // Negative tests to verify that "Goal Name" is a Mandatory Field, can't be left empty and does not accept less than 4 characters
  test.describe('Goal Name Field Validation', () => {
    for (const { goalName, description } of testCasesForGoalNameValidation) {
      test(`Test Goal Name: ${description}`, async ({ page }) => {
        // Start directly in an authenticated state using storage session
        const goalPage = new GoalPage(page);
        await goalPage.goToCreategGoalPage();

        // Fill out the goal form with the current test case's goalName
        await goalPage.fillGoalForm(goalName, '10', 'This is a test goal description', '100');

        // Try to create the goal
        await goalPage.submitNewGoal();

        // Verify that the error message for Goal Name is displayed
        await goalPage.verifyMessageErrorIsDisplayed(goalNameError);

      });
    }
  });
  // Negative test cases to check start Date can't be 
  test.describe('Date Validation', () => {
    for (const { startDate, dueDate, description, expectedError } of testCasesForDates) {
      test(`Test Date Validation: ${description}`, async ({ page }) => {
        const goalPage = new GoalPage(page);
        await goalPage.goToCreategGoalPage();

        // Fill the form with startDate and dueDate
        await goalPage.fillGoalForm(`Automation_test_Goal_${Date.now()}`, '10', 'This is a test goal description', '100', startDate, dueDate);

        // Submit the form
        await goalPage.submitNewGoal();

        // Verify the error message for date validation
        await goalPage.verifyMessageErrorIsDisplayed(expectedError);

      });
    }
  });
});