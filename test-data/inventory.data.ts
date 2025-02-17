type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export const InventoryTestData = {
    items: {
        backpack: {
            id: 'sauce-labs-backpack',
            name: 'Sauce Labs Backpack',
            price: 29.99
        },
        bikeLight: {
            id: 'sauce-labs-bike-light',
            name: 'Sauce Labs Bike Light',
            price: 9.99
        },
        boltTshirt: {
            id: 'sauce-labs-bolt-t-shirt',
            name: 'Sauce Labs Bolt T-Shirt',
            price: 15.99
        }
    },
    sortOptions: {
        nameAZ: 'az' as SortOption,
        nameZA: 'za' as SortOption,
        priceLowHigh: 'lohi' as SortOption,
        priceHighLow: 'hilo' as SortOption
    },
    messages: {
        cartEmpty: 'No items in cart',
        checkoutComplete: 'Thank you for your order!'
    }
};