import { Page, Locator, expect } from '@playwright/test';

export default class InventoryPage {
    private page: Page;
    private inventoryList: Locator;
    private cartBadge: Locator;
    private sortSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortSelect = page.locator('[data-test="product_sort_container"]');
    }

    async addToCart(itemName: string) {
        await this.page.waitForSelector(`[data-test="add-to-cart-${itemName}"]`, { state: 'visible' });
        await this.page.click(`[data-test="add-to-cart-${itemName}"]`);
    }

    async removeFromCart(itemName: string) {
        await this.page.waitForSelector(`[data-test="remove-${itemName}"]`, { state: 'visible' });
        await this.page.click(`[data-test="remove-${itemName}"]`);
    }

    async sortItems(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.page.waitForLoadState('networkidle');
        await this.sortSelect.waitFor({ state: 'visible' });
        await this.sortSelect.selectOption(option);
        // Esperar a que la lista se actualice
        await this.page.waitForTimeout(500);
    }

    async getCartCount(): Promise<number> {
        try {
            await this.cartBadge.waitFor({ state: 'visible', timeout: 2000 });
            const text = await this.cartBadge.textContent();
            return text ? parseInt(text) : 0;
        } catch {
            return 0;
        }
    }

    async getInventoryItemsCount(): Promise<number> {
        await this.inventoryList.waitFor({ state: 'visible' });
        return await this.page.locator('.inventory_item').count();
    }

    async getFirstItemName(): Promise<string | null> {
        await this.page.waitForSelector('.inventory_item_name', { state: 'visible' });
        return await this.page.locator('.inventory_item_name').first().textContent();
    }

    async validateItemAdded() {
        await this.cartBadge.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.cartBadge).toHaveText('1');
    }

    async validateItemRemoved() {
        await expect(this.cartBadge).not.toBeVisible({ timeout: 5000 });
    }
}