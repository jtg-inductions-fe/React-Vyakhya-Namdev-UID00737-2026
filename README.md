# GitHub User Search

A React application that allows users to search for GitHub users and view their profile details using the GitHub API.

## Features

- Search for GitHub users by username.
- View GitHub user details.
- View user avatar, username, location, followers, following, bio, email, blog, and GitHub profile.
- Login using a GitHub Personal Access Token (PAT).
- Protected/guarded routes for authenticated users.
- Responsive navigation with a mobile-friendly menu.
- API state management using Redux Toolkit and RTK Query.
- Form validation and error handling.
- Reusable and maintainable React components.
- ESLint and Prettier for code quality and formatting.
- Husky pre-commit hooks for maintaining code quality.

## Tech Stack

- **React**
- **TypeScript**
- **Redux Toolkit**
- **RTK Query**
- **Material UI**
- **React Router**
- **GitHub REST API**
- **Vite**
- **Yarn**
- **ESLint**
- **Prettier**
- **Husky**

## Prerequisites

Before running the project, make sure you have:

- **Node.js:** Version 20+
- **Yarn:** Version 4.5.0+

## Getting Started

### 1. Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Configure Node.js

If the required Node.js version is already installed, run:

```bash
nvm use
```

If it is not installed:

```bash
nvm install
```

If you don't have NVM installed, install it from the official NVM repository.

### 3. Configure Yarn

If Yarn is not installed:

```bash
npm install -g yarn
```

Set the project to use Yarn Berry:

```bash
yarn set version berry
```

### 4. Install Dependencies

Install the project dependencies:

```bash
yarn
```

## Running the Application

Start the development server:

```bash
yarn dev
```

The application will be available at the URL shown in the terminal, typically:

```text
http://localhost:5173
```

## Available Scripts

### Format Code

Format the project using Prettier:

```bash
yarn prettier
```

### Lint Code

Check the project for linting issues:

```bash
yarn lint
```

### Fix Lint Errors

Automatically fix supported linting issues:

```bash
yarn lint:fix
```

### Build the Project

Create an optimized production build:

```bash
yarn build
```

The generated files will be available in the `dist` directory.

### Development Build

Create a development build:

```bash
yarn build:dev
```

### Preview Production Build

Preview the production build locally:

```bash
yarn preview
```

## Authentication

The application uses a **GitHub Personal Access Token (PAT)** for authentication with the GitHub API.

The token is sent through the `Authorization` header when making authenticated API requests.

## Project Structure

```text
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
├── constant/        # Application constants
├── features/        # Feature-specific modules
├── hooks/           # Custom React hooks
├── routes/          # Application routing and guarded routes
├── services/        # API services and RTK Query configuration
├── store/           # Redux store configuration
├── theme/           # MUI theme, typography, colors and foundations
├── App.tsx
└── main.tsx
```

## Code Quality

The project uses:

- **ESLint** for identifying code-quality and potential JavaScript/TypeScript issues.
- **Prettier** for consistent code formatting.
- **Husky** for Git hooks.
- **lint-staged** for running checks on staged files.
