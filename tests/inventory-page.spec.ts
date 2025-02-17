import { test, expect, Page } from '@playwright/test';
import LoginPage from '../pages/login-page';
import InventoryPage from '../pages/inventory-page';
import { LoginTestData } from '../test-data/login.data';
import { InventoryTestData } from '../test-data/inventory.data';
import { TestUtils } from '../utils/test-utils';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.describe('Inventory Page Tests', () => {
    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.goto(LoginTestData.urls.base);
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        
        await loginPage.login(
            LoginTestData.credentials.valid.username,
            LoginTestData.credentials.valid.password
        );
        await TestUtils.waitForPageLoad(page);
    });

    test('should display inventory items', async ({ page }: { page: Page }) => {
        const items = await inventoryPage.getInventoryItemsCount();
        expect(items).toBeGreaterThan(0);
    });

    test('should be able to add item to cart', async ({ page }: { page: Page }) => {
        await inventoryPage.addToCart(InventoryTestData.items.backpack.id);
        await inventoryPage.validateItemAdded();
    });

    test('should be able to remove item from cart', async ({ page }: { page: Page }) => {
        await inventoryPage.addToCart(InventoryTestData.items.backpack.id);
        await inventoryPage.removeFromCart(InventoryTestData.items.backpack.id);
        await inventoryPage.validateItemRemoved();
    });

    test('should be able to sort items', async ({ page }: { page: Page }) => {
        const items = await inventoryPage.getInventoryItemsCount();
        expect(items).toBeGreaterThan(0);

        // Ordenar de Z a A
        await inventoryPage.sortItems(InventoryTestData.sortOptions.nameZA);
        const firstItemNameZA = await inventoryPage.getFirstItemName();
        
        // Ordenar de A a Z
        await inventoryPage.sortItems(InventoryTestData.sortOptions.nameAZ);
        const firstItemNameAZ = await inventoryPage.getFirstItemName();
        
        // Verificar que el orden cambió
        expect(firstItemNameZA).not.toEqual(firstItemNameAZ);
        expect(firstItemNameZA?.localeCompare(firstItemNameAZ || '')).toBeGreaterThan(0);
    });
});