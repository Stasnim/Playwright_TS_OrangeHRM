# Project Overview

A production-ready end-to-end automation framework built using Playwright with TypeScript, targeting the OrangeHRM demo application.

Follows industry best practices: Page Object Model (POM), fixtures, data-driven tests

Integrated with CI/CD pipelines (GitHub Actions, future Azure DevOps support)

Designed for parallel execution, agents, and scalable automation architecture

 Application Under Test: OrangeHRM Demo

# Tech Stack

Playwright – End-to-end testing automation

TypeScript – Strong typing & scalable code

Node.js – Runtime

Cucumber (BDD) – Behavior-driven development (in progress)

GitHub Actions – CI/CD pipeline

Azure DevOps – Planned CI/CD & parallel execution

🧱 Project Structure
Plw-ts-Orangehrm/
├── .github/workflows/       # GitHub Actions CI pipeline
├── fixtures/                # Test fixtures & setup
├── pages/                   # Page Object Model (POM)
├── tests/                   # Test specifications
├── steps/                   # Cucumber step definitions (future)
├── utils/                   # Test data & helpers
├── uploaditems/             # File upload resources
├── playwright.config.ts     # Playwright configuration
├── package.json
└── README.md

# Test Coverage

Login functionality

Recruitment – Candidate creation, update, delete, view

Recruitment- Candidate- filters, list

File upload,download validation

Positive & negative test scenarios

Dynamic locators, hidden option of dropdown, custom utilities for date picker

All tests are independent, data-driven, and CI-ready.

## Run Tests Locally
## Install dependencies
npm install

## Install Playwright browsers
npx playwright install

## Run all tests
npx playwright test

## Run tests in UI mode
npx playwright test --ui

## Show HTML report
npx playwright show-report

# Continuous Integration

GitHub Actions automatically runs tests on every push and pull request

Supports parallel execution, reporting, and artifacts

Planned integration with Azure DevOps CI/CD for multi-agent execution

📈 Learning & Enhancements (Professional Growth)

✔ Playwright E2E framework

✔ GitHub Actions CI

🔄 Cucumber BDD integration (in progress)

🔄 Azure DevOps CI/CD pipelines (in progress)

🔄 Parallel execution & agents (in progress)

🔄 Modular & scalable automation (MCP mindset)



👤 Author

Sifat-E-Tasnim
Automation Test Engineer – Playwright | TypeScript
GitHub: https://github.com/Stasnim
