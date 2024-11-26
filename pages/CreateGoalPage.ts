import { expect, type Locator, type Page } from '@playwright/test';
import { getTodayDate, getOneYearFromTodayDate } from '../utils/dateHelpers';

export class CreateGoalPage {
  readonly page: Page;
  readonly goalsNav: Locator
  readonly createGoalButton: Locator;
  readonly goalNameInput: Locator;
  readonly targetInput: Locator;
  readonly unitsInput: Locator;
  readonly startDateInput: Locator;
  readonly dueDateInput: Locator;
  readonly goalDescriptionInput: Locator;
  readonly goalCategorySelect: Locator;
  readonly goalWeightInput: Locator;
  readonly assignmentContainer: Locator;
  readonly submitGoal: Locator;

  constructor(page: Page) {
    this.page = page;
    // Define locators for all elements on the goal creation page
    this.goalsNav = page.locator('[testid="goals-nav"]');
    this.createGoalButton = page.locator('[data-testid="createGoalButton"]');
    this.goalNameInput = page.locator('[placeholder="Goal name here"]');
    this.targetInput = page.locator('#target');
    this.unitsInput = page.locator('#units');
    this.startDateInput = page.locator('#start-date');
    this.dueDateInput = page.locator('#due-date');
    this.goalDescriptionInput = page.locator('[placeholder="Goal description here"]');
    this.goalCategorySelect = page.locator('[aria-label="Goal Category"]');
    this.goalWeightInput = page.locator('[placeholder="Enter goal weight"]');
    this.assignmentContainer = page.locator('[data-testid="assignmentContainer"]');
    this.submitGoal = page.locator('[data-testid="createGoalButton"]');
  }

  // Go to create goal page
  async goToCreategGoalPage() {
    await this.page.goto('/');
    // Go to Goals menu
    await this.goalsNav.click();
  }

  // Fills out the goal creation form
  async fillGoalForm(goalName: string, target: string, description: string, goalWeight: string, startDate: string = getTodayDate(),
    dueDate: string = getOneYearFromTodayDate(), advanced = false) {
    await this.createGoalButton.click();
    await this.goalNameInput.click();
    await this.goalNameInput.fill(goalName);
    await this.targetInput.click();
    await this.targetInput.fill(target);
    await this.unitsInput.click();
    await this.unitsInput.fill(''); // Example empty input=> can be customized
    await this.startDateInput.fill(startDate);
    await this.dueDateInput.fill(dueDate);
    await this.goalDescriptionInput.click();
    await this.goalDescriptionInput.fill(description);
    await this.goalWeightInput.click();
    await this.goalWeightInput.fill(goalWeight);



    if (advanced) { }
  }

  // Selects goal category
  async selectGoalCategory(category: string) {
    await this.goalCategorySelect.click();
    await this.page.locator('role=option', { name: category }).click();
  }

  // Assigns goal to an employee
  async assignGoalToEmployee(employeeName: string) {
    await this.assignmentContainer.click();
    await this.page.locator('role=option', { name: employeeName }).click();
  }

  // Submits the goal form
  async submitNewGoal() {
    await this.submitGoal.click();
  }

  // Verifies goal creation success message
  async verifyGoalCreationSuccess() {
    const successMessage = await this.page.locator('text=Goal created successfully');
    await expect(successMessage).toBeVisible();
  }

  // Verifies target defualt value is 100
  async verifyTargetDefaultValue() {
    await this.createGoalButton.click();
    const targetValue = await this.targetInput.inputValue();
    if (targetValue !== '100') {
      throw new Error(`Expected Target field default value to be '100', but got '${targetValue}'`);
    }
  }
  
   // Verifies if an error message is displayed
  async verifyMessageErrorIsDisplayed(expectedError: string) {
    const errorLocator = this.page.locator('[role="alert"]');
    await expect(errorLocator).toHaveText(expectedError);
  }

}
