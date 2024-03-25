<!-- omit in toc -->
# Developer documentation

Welcome to the developer documentation of the **InventoryTracker** project.  
This documentation is intended for developers who want to contribute to the project.  
  
If you are a new contributor, you should start by reading the [getting started](#getting-started) section.  
If you need some precise information, see the following sections :  

<!-- omit in toc -->
## Table of contents

- [Getting started](#getting-started)
  - [Before you begin](#before-you-begin)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Learn more](#learn-more)
  - [Project structure](#project-structure)
  - [Interactions](#interactions)
  - [Networking](#networking)
  - [Technologies](#technologies)

## Getting started

### Before you begin

Before you begin, you should have a basic understanding of the following:

- Take a look at the [contributing guidelines](../../CONTRIBUTING.md) to understand how to contribute to the project.
- Take a look at the [code of conduct](../../CODE_OF_CONDUCT.md) to understand how to behave in the project.
- Take a look at the [project structure](#project-structure) to understand how the project is organized.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (v20.10.7 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (v1.29.2 or higher)

### Installation

1. Clone the repository

    ```bash
    git clone git@github.com:Vivelis/InventoryTracker.git
    ```

2. Move to the project directory

    ```bash
    cd InventoryTracker
    ```

3. Deploy the project locally using Docker Compose

    ```bash
    docker compose up --build
    ```

### Usage

- Access the web server at [http://localhost:4200](http://localhost:4200).
- Access the back server at [http://localhost:3000](http://localhost:3000).
- Access the database adminer at [http://localhost:8080](http://localhost:8080).

## Learn more

### Project structure

The project is structured as follows:

```bash
docker-compose.yml
├── /back
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── app.ts
├── /front
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── /src
│       ├── main.ts
├── /docs
│   ├── developer_documentation/
│   ├── user_documentation/
│   ├── index.md
├── docker-compose.yml
├── docker-compose.dev.yml
```

> Project structure diagram

- `back`: Runs the REST API server to communicate with the database.
- `front`: Runs the web server seen by the user.
- `docs`: Contains the documentation of the project.
- `docker-compose.yml`: The main file to deploy the project in production mode.
- `docker-compose.dev.yml`: The main file to deploy the project in development mode.

### Interactions

The following diagram shows the interactions between the different parts of the project:  

```txt
   +-----------+       +----------+       +------------+
   |   Front   | <---> |   Back   | <---> |  DataBase  |
   +-----------+       +----------+       +------------+
```

> Interactions diagram

The **front** communicates with the back using the REST API.  
The **back** communicates with the database using the database driver.  
The **database** stores the data.  

### Networking

The following diagram shows the networking of the project:  

```txt
External ports:   4200               3000                                     8080
                    |                  |                                        |
              +-----------+       +----------+       +------------+       +------------+
              |   Front   |       |   Back   | <---> |  DataBase  | <---> |  Adminer   |
              +-----------+       +----------+       +------------+       +------------+
```

> Networking diagram

The **front** is accessible on the World Wide Web at port **4200**.
The **back** is accessible on the World Wide Web at port **3000**.
The **database** isn't accessible on the World Wide Web.
The **adminer** is accessible on the World Wide Web at port **8080**.

The **back** and the **adminer** can communicate with the **database** using the internal docker network called **back-net**.

### Technologies

The project uses the following technologies:

- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [TypeScript](https://www.typescriptlang.org/)
