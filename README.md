# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Docker

This project is configured to run in a Docker container.

### Building and Running with Docker

To build and run the application using Docker:

```bash
# Build the Docker image
docker build -t pucpr-login .

# Run the container
docker run -p 80:80 pucpr-login
```

The application will be available at http://localhost:80

### Using Docker Compose

You can also use Docker Compose to build and run the application:

```bash
# Build and run with Docker Compose
docker-compose up -d

# Stop the container
docker-compose down
```

### Development with Docker

For development, you can uncomment the volume mounts and command in `docker-compose.yml` to enable hot reloading:

```yaml
volumes:
  - ./:/app
  - /app/node_modules
command: npm start
```

Then run:

```bash
docker-compose up -d
```

## CI/CD and Deployment

This project is configured with GitHub Actions for continuous integration and deployment to GitHub Pages and Docker.

### GitHub Actions Workflow

The CI/CD pipeline is defined in `.github/workflows/ci-cd.yml` and includes the following steps:

1. **Build and Push Docker Image**: Builds a Docker image and pushes it to GitHub Container Registry.
2. **Build**: Builds the application for static deployment.
3. **Deploy**: Deploys the built application to GitHub Pages.

### Manual Deployment

You can also manually deploy the application using:

```
npm run deploy
```

This will build the application and deploy it to the `gh-pages` branch of your repository.

### GitHub Pages

The application is configured to be deployed to GitHub Pages. You can access the deployed application at:

```
https://[your-github-username].github.io/pucpr-login/
```

> **Note**: Before deploying, make sure to update the `homepage` field in `package.json` with your GitHub username.

### Docker Image

The Docker image is published to GitHub Container Registry and can be pulled using:

```bash
docker pull ghcr.io/[your-github-username]/pucpr-login:latest
```
