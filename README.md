
# **Playwright Automation Project: Create Goal Feature**

This project automates the testing of the **"Create a Goal"** feature in the PerformYard application using **Playwright**. 

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features Covered](#features-covered)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Running Tests](#running-tests)
6. [Configuration Details](#configuration-details)
7. [Future Improvements](#future-improvements)

---

## **Project Overview**

This Playwright project uses the **Page Object Model (POM)** to maintain a clean, modular structure and ensure ease of maintenance. The tests focus on verifying:
- Core functionalities of the **Create Goal** form.
- Validations for required fields and invalid input scenarios.
- Edge cases like date constraints and numeric limits.

---

## **Features Covered**

1. **Successful Goal Creation**:
   - Ensures a user can create a goal by filling all required fields.
2. **Field Validations**:
   - Verifies mandatory fields like "Goal Name" display appropriate error messages.
   - Checks date constraints (e.g., "Due Date" must be after "Start Date").
   - Tests input constraints for the "Target" field (e.g., handling negative or non-numeric values).
3. **Parameterized Tests**:
   - Reuses test logic with multiple sets of data.
4. **Cross-Browser Support**:
   - Runs tests on Chromium, Firefox, and WebKit.

---

## **Project Structure**

```plaintext
playwright-performyard_POC/
├── pages/                     # Page Object Model files
│   ├── loginPage.ts           # Login page selectors and actions
│   ├── createGoalPage.ts      # Create Goal form selectors and actions
├── tests/                     # Test cases
│   ├── createGoal.spec.ts     # Tests for Create Goal feature
├── .env                       # Environment variables (e.g., credentials, base URL)
├── playwright.config.ts       # Playwright configuration file
├── package.json               # Node.js project metadata and scripts
├── tsconfig.json              # TypeScript configuration (if using TypeScript)
├── README.md                  # Documentation
├── node_modules/              # Installed dependencies (auto-generated)
└── test-results/              # Test results and reports (auto-generated)
```

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js (version 16 or above) installed.
- npm (Node Package Manager).

### **2. Clone the Repository**
Clone this repository to your local machine:
```bash
git clone https://github.com/laura-vspartners/playwright_performyard_POC.git
cd playwright-performyard_POC
```

### **3. Install Dependencies**
Run the following command to install all required dependencies:
```bash
npm install
```

### **4. Configure Environment Variables**
Create a `.env` file in the project root and add the following:
```env
BASE_URL=https://staging.talent.performyard.com/
USERNAME=laura.andreescu@vspartners.com
PASSWORD=Sergiu2023!!
```

### **5. Playwright Browsers**
Install the necessary browsers for Playwright:
```bash
npx playwright install
```

---

## **Running Tests**

### **1. Run All Tests**
To execute all tests in headless mode:
```bash
npm test
```

### **2. Run Tests in Headed Mode**
To run tests with a visible browser:
```bash
npm run test:headed
```

### **3. Generate Reports**
Playwright automatically generates HTML reports. To open the report after running tests:
```bash
npx playwright show-report
```

### **4. Specific Test File**
Run a specific test file (e.g., `createGoal.spec.ts`):
```bash
npx playwright test tests/createGoal.spec.ts
```

---

## **Configuration Details**

### **Playwright Configuration (`playwright.config.ts`)**
The `playwright.config.ts` file contains global configurations:
- **Base URL**: Loaded from `.env`.
- **Browser Settings**: Default browser is Chromium.
- **Test Timeout**: 60 seconds.
- **Trace and Screenshot**: Enabled for debugging failures.


---

## **Future Improvements**

1. **Data-Driven Testing**:
   - Use a JSON or CSV file for input data instead of hardcoding values in test cases.
2. **CI/CD Integration**:
   - Automate test execution using GitHub Actions or Jenkins.
3. **Enhanced Coverage**:
   - Add UI tests for responsiveness across various screen sizes.
4. **Mock API Integration**:
   - Mock backend API responses to isolate front-end testing.

---
