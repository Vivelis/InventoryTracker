/**
 * @fileoverview Jest testcontainers configuration file
 * @link [testcontainers](https://github.com/Trendyol/jest-testcontainers)
 * @project InventoryTracker
 * @license MIT
 */

module.exports = {
    postgre: {
        image: 'postgres',
        tag: 'alpine',
        ports: [5432],
        env: {
            POSTGRES_USER: 'inventory_tracker',
            POSTGRES_PASSWORD: 'password',
            POSTGRES_DB: 'inventory_tracker',
        },
        wait: {
            type: 'text',
            text: 'server started'
        }
    },
};
