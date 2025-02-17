import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login-page";
import { LoginTestData } from "../test-data/login.data";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    await page.goto(LoginTestData.urls.base);
    loginPage = new LoginPage(page);
});

test.describe('Login Functionality', () => {
    test("should login with valid credentials", async ({ page }) => {
        await loginPage.login(
            LoginTestData.credentials.valid.username,
            LoginTestData.credentials.valid.password
        );
        await expect(page.url()).toBe(LoginTestData.urls.inventory);
    });

    test.describe('Error Scenarios', () => {
        test("should display an error message with locked credentials", async ({ page }) => {
            await loginPage.login(
                LoginTestData.credentials.invalid.username,
                LoginTestData.credentials.valid.password
            );
            await loginPage.expectErrorMessage(LoginTestData.errorMessages.lockedOut);
        });

        test("should display an error message with empty username", async ({ page }) => {
            await loginPage.login(
                LoginTestData.credentials.empty.username,
                LoginTestData.credentials.valid.password
            );
            await loginPage.expectErrorMessage(LoginTestData.errorMessages.requiredUsername);
        });

        test("should display an error message with empty password", async ({ page }) => {
            await loginPage.login(
                LoginTestData.credentials.valid.username,
                LoginTestData.credentials.empty.password
            );
            await loginPage.expectErrorMessage(LoginTestData.errorMessages.requiredPassword);
        });

        test("should display an error message with empty username and password", async ({ page }) => {
            await loginPage.login(
                LoginTestData.credentials.empty.username,
                LoginTestData.credentials.empty.password
            );
            await loginPage.expectErrorMessage(LoginTestData.errorMessages.requiredUsername);
        });

        test("should display an error message with empty username and invalid password", async ({ page }) => {
            await loginPage.login(
                LoginTestData.credentials.empty.username,
                LoginTestData.credentials.invalid.password
            );
            await loginPage.expectErrorMessage(LoginTestData.errorMessages.requiredUsername);
        });

        test("should display an error message with invalid username and empty password", async ({ page }) => {
            await loginPage.login(
                LoginTestData.credentials.invalid.username,
                LoginTestData.credentials.empty.password
            );
            await loginPage.expectErrorMessage(LoginTestData.errorMessages.requiredPassword);
        });

        test("should display an error message with invalid username and invalid password", async ({ page }) => {
            await loginPage.login(
                LoginTestData.credentials.invalid.username2,
                LoginTestData.credentials.invalid.password
            );
            await loginPage.expectErrorMessage(LoginTestData.errorMessages.notMatch);
        });
    });
});
