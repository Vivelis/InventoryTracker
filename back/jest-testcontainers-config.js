module.exports = {
    redis: {
        image: 'postgres',
        tag: 'alpine',
        env: {
            POSTGRES_USER: 'inventory_tracker',
            POSTGRES_PASSWORD: 'password',
            POSTGRES_DB: 'inventory_tracker',
        },
        wait: {
            type: 'text',
            text: 'Ready to accept connections'
        }
    },
};