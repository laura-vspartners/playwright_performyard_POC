import { test as base, expect } from '@playwright/test';
import { CreateGoalPage } from '../pages/CreateGoalPage';

type MyFixtures = {
  createGoalPage: CreateGoalPage;
};

export const test = base.extend<MyFixtures>({
  createGoalPage: async ({ page }, use) => {
    await use(new CreateGoalPage(page));
  },
});

export { expect };
