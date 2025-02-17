import { Page, expect } from '@playwright/test';

export class TestUtils {
    static async waitForPageLoad(page: Page) {
        await page.waitForLoadState('networkidle');
    }

    static async clearAndFillInput(page: Page, selector: string, text: string) {
        await page.fill(selector, '');
        await page.fill(selector, text);
    }

    static getRandomString(length: number): string {
        return Math.random().toString(36).substring(2, length + 2);
    }

    static async takeScreenshot(page: Page, name: string) {
        await page.screenshot({ path: `./screenshots/${name}.png` });
    }

    static async waitForElement(page: Page, selector: string, timeout = 5000) {
        await page.waitForSelector(selector, { timeout });
    }

    static async validateElementText(page: Page, selector: string, expectedText: string) {
        const element = page.locator(selector);
        await expect(element).toHaveText(expectedText);
    }

    static async validateElementVisible(page: Page, selector: string) {
        const element = page.locator(selector);
        await expect(element).toBeVisible();
    }

    static async validateUrl(page: Page, expectedUrl: string) {
        await expect(page).toHaveURL(expectedUrl);
    }

    static async retryAction(action: () => Promise<void>, maxRetries = 3, delay = 1000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await action();
                return;
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}