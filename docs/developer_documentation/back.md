# Back Documentation

## Overview

This is an Express.js application that serves as the backend for our project.  
It provides APIs for the frontend and handles database operations.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repo

   ```bash
   git clone git@github.com:Vivelis/InventoryTracker.git
   ```

2. Move to the project directory

   ```bash
    cd InventoryTracker
    ```

3. Install NPM packages

   ```bash
   npm install
   ```

## Usage

This application provides the following endpoints:

| Method | Endpoint                          | Description                                          |
| ------ | --------------------------------- | ---------------------------------------------------- |
| POST   | /api/v1/users/sign-up             | Create a new user                                    |
| POST   | /api/v1/users/sign-in             | Authenticate a user                                  |
| GET    | /api/v1/users/sign-out            | Sign out a user                                      |
| GET    | /api/v1/users/:userId             | Retrieving a user's profile (restricted to the user) |
| PUT    | /api/v1/users/:userId             | Updating a user's profile (restricted to the user)   |
| GET    | /api/v1/users/all                 | Retrieving all users (restricted to admins)          |
| PUT    | /api/v1/users/change-role/:userId | Updating a user's role (restricted to admins)        |
| DELETE | /api/v1/users/:userId             | Deleting a user (restricted to admins)               |
| GET    | /api/v1/users/:userId/nodes       | Retrieving all nodes of a user                       |
| GET    | /api/v1/node/:nodeId              | Retrieving a node                                    |
| POST   | /api/v1/node                      | Creating a node                                      |
| PUT    | /api/v1/node/:nodeId              | Updating a node                                      |
| DELETE | /api/v1/node/:nodeId              | Deleting a node                                      |

## Testing

To run the test suite, execute the following command:

```bash
npm test
```

## Deployment

### For development

Run with docker:

```bash
cd back
docker build --file Dockerfile.dev --tag inventory_tracker_back_dev .
docker run --publish 3000:3000 inventory_tracker_back_dev
```

Run with docker-compose:

```bash
docker compose --file docker-compose.dev.yaml up --build
```

### For production

Run with docker:

```bash
cd back
docker build --tag inventory_tracker_back .
docker run --publish 3000:3000 inventory_tracker_back
```

Run with docker-compose:

```bash
docker compose up --build
```

## Built With

- [Express.js](https://expressjs.com/) - The web framework used

## Contributing

To contribute to this project, please refer to the [CONTRIBUTING.md](https://github.com/Vivelis/InventoryTracker/blob/main/CONTRIBUTING.md) file.

## License

This project is licensed under the ``MIT`` license - see the [LICENSE](https://github.com/Vivelis/InventoryTracker/blob/main/LICENSE) file for more details.
