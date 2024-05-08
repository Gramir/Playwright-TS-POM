import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login-page";

const url = "https://www.saucedemo.com/";
const validUsername = "standard_user";
const validPassword = "secret_sauce";
const invalidUsername = "locked_out_user";
const invalidUsername2 = "problem_users";
const invalidPassword = "invalid_password";

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("should login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(validUsername, validPassword);
  await expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
});

test("should display an error message with invalid credentials", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(invalidUsername, validPassword);
  await loginPage.expectErrorMessage(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("should display an error message with empty username", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("", validPassword);
  await loginPage.expectErrorMessage("Epic sadface: Username is required");
});

test("should display an error message with empty password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(validUsername, "");
  await loginPage.expectErrorMessage("Epic sadface: Password is required");
});

test("should display an error message with empty username and password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("", "");
  await loginPage.expectErrorMessage("Epic sadface: Username is required");
});

test("should display an error message with empty username and invalid password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("", invalidPassword);
  await loginPage.expectErrorMessage("Epic sadface: Username is required");
});

test("should display an error message with invalid username and empty password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(invalidUsername, "");
  await loginPage.expectErrorMessage("Epic sadface: Password is required");
});

test("should display an error message with invalid username and invalid password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(invalidUsername2, invalidPassword);
  await loginPage.expectErrorMessage(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
