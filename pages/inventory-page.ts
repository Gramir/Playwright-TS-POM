import { Page, Locator, expect } from '@playwright/test';

export default class InventoryPage {
    private page: Page;
    private inventoryList: Locator;
    private cartBadge: Locator;
    private sortSelect: Locator;
    private inventoryItems: Locator;
    private firstItemName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortSelect = page.locator('[data-test="product_sort_container"]');
        this.inventoryItems = page.locator('.inventory_item');
        this.firstItemName = page.locator('.inventory_item_name').first();
    }

    async addToCart(itemId: string) {
        const buttonSelector = `[data-test="add-to-cart-${itemId}"]`;
        await this.page.waitForSelector(buttonSelector, { state: 'visible', timeout: 5000 });
        await this.page.click(buttonSelector);
    }

    async removeFromCart(itemId: string) {
        const buttonSelector = `[data-test="remove-${itemId}"]`;
        await this.page.waitForSelector(buttonSelector, { state: 'visible', timeout: 5000 });
        await this.page.click(buttonSelector);
    }

    async sortItems(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortSelect.waitFor({ state: 'visible', timeout: 5000 });
        await this.sortSelect.selectOption(option);
        // Esperar a que la lista se actualice
        await this.page.waitForTimeout(1000);
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
        await this.inventoryList.waitFor({ state: 'visible', timeout: 5000 });
        return await this.inventoryItems.count();
    }

    async getFirstItemName(): Promise<string | null> {
        await this.firstItemName.waitFor({ state: 'visible', timeout: 5000 });
        return await this.firstItemName.textContent();
    }

    async validateItemAdded() {
        await this.cartBadge.waitFor({ state: 'visible', timeout: 5000 });
        const count = await this.getCartCount();
        expect(count).toBe(1);
    }

    async validateItemRemoved() {
        try {
            await this.cartBadge.waitFor({ state: 'hidden', timeout: 5000 });
        } catch {
            const count = await this.getCartCount();
            expect(count).toBe(0);
        }
    }
}