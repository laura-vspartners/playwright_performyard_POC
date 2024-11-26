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
  readonly openGoalCategorylist: Locator;
  readonly selectGoalAssignee: Locator;
  readonly goalWeightInput: Locator;
  readonly assignmentContainer: Locator;
  readonly expandAdvancedOptions: Locator;
  readonly setAsTopLevelOrgGoal: Locator;
  readonly goalCheckList: Locator;
  readonly addItem: Locator;
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
    this.openGoalCategorylist = page.locator('#category-picker');
    this.selectGoalAssignee = page.locator('[data-testid="assignmentContainer"]');
    this.goalWeightInput = page.locator('[placeholder="Enter goal weight"]');
    this.assignmentContainer = page.locator('[data-testid="assignmentContainer"]');
    this.expandAdvancedOptions = page.getByRole('button', { name: 'Advanced Options' });
    this.setAsTopLevelOrgGoal = page.locator('input[type="checkbox"]').locator('..');
    this.addItem = page.locator('[data-testid="checklistAddButton"]');
    this.goalCheckList = page.locator('[placeholder="Checklist goal item"]');
    this.submitGoal = page.locator('[data-testid="createGoalButton"]');
  }

  // Go to create goal page
  async goToCreategGoalPage() {
    await this.page.goto('/');
    // Go to Goals menu
    await this.goalsNav.click();
  }

  // Fills out the goal creation form using an object
  async fillGoalForm({
    goalName,
    target,
    description,
    goalWeight,
    goalCategory,
    assignee,
    startDate = getTodayDate(),
    dueDate = getOneYearFromTodayDate(),
    advanced = false,
    setAsTopLevelOrgGoal = false,
    goalChecklist = '',
  }: {
    goalName: string;
    target: string;
    description: string;
    goalWeight: string;
    goalCategory: string;
    assignee: string;
    startDate?: string;
    dueDate?: string;
    advanced?: boolean;
    setAsTopLevelOrgGoal?: boolean,
    goalChecklist?: string;
  }) {
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
    await this.selectGoalCategoryAndCheckSelection(goalCategory);
    await this.removeGoalAssignee(assignee);
    await this.assignGoalToEmployee(assignee);
    if (advanced) {
      await this.expandAdvancedOptions.click();
      // Check transparency is set by default to public
      const divLocator = this.page.locator('[data-testid="select-transparency"] div').locator('div').filter({ hasText: 'Public' }).first();
      await expect(divLocator).toHaveText('Public');
      // Set as top-level org goal
      if (setAsTopLevelOrgGoal) {
        this.setAsTopLevelOrgGoal.check();
      }
      if (goalChecklist) {
        // Add goal check list
        this.goalCheckList.click();
        this.goalCheckList.fill(goalChecklist);
        this.addItem.click();
      }
    }
  }
  // Selects goal category
  async selectGoalCategoryAndCheckSelection(goalCategory: string) {
    await this.openGoalCategorylist.click();
    await this.page.getByRole('option', { name: goalCategory }).click();
    //Check category has been selected
    // Locate the chip-label that contains the <p> with the specific text
    const chipLabel = this.page.locator('[data-testid="chip-label"] p', { hasText: goalCategory }).first(); // 'first()' ensures we get the first match
    // Verify the chip-label reflects the selected value
    await expect(chipLabel).toBeVisible();
  }

  // Remove goal assignee
  async removeGoalAssignee(employeeName: string) {
    // Locate the circle-xmark icon inside the parent chip-label element
    const circleXMark = this.page.locator('[data-testid="chip-label"] p', { hasText: employeeName }).locator('..').locator('..').locator('[data-icon="circle-xmark"]');
    // Click the circle-xmark icon
    await circleXMark.click();
  }

  // Assigns goal to an employee
  async assignGoalToEmployee(employeeName: string) {
    await this.selectGoalAssignee.click();
    await this.page.getByRole('option', { name: employeeName }).click();
    //Check employee has been selected
    const chipLabel = this.page.locator('[data-testid="chip-label"] p', { hasText: employeeName });
    // Verify the chip-label reflects the selected value
    await expect(chipLabel).toBeVisible();
  }

  // Submits the goal form
  async submitNewGoal() {
    await this.submitGoal.click();
  }

  // Verifies goal creation success message
  async verifyGoalCreationSuccess() {
    const successMessage = this.page.locator('.message', { hasText: "Created one Goal" });
    await expect(successMessage).toBeVisible();
  }

  // Verifies target defualt value is 100
  async verifyTargetDefaultValueAndType() {
    await this.createGoalButton.click();
    const targetValue = await this.targetInput.inputValue();
    if (targetValue !== '100') {
      throw new Error(`Expected Target field default value to be '100', but got '${targetValue}'`);
    }
    // Check only number type is accepted for target
    const inputType = await this.targetInput.getAttribute('type');
    expect(inputType).toBe('number');
  }

  // Verifies if an error message is displayed
  async verifyMessageErrorIsDisplayed(expectedError: string) {
    const errorLocator = this.page.locator('[role="alert"]');
    await expect(errorLocator).toHaveText(expectedError);
  }

  //TODO
  // add more methods and refactor fillGoalForm to break it into 2 separate methods for basic fields and advanced fields
  // add more checks for goals such as going to Goals page and search for the newly created goal name in the list of goals
}
