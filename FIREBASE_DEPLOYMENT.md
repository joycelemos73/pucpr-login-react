# Firebase Deployment Setup

This document outlines the setup required for the Firebase deployment workflow.

## GitHub Secrets Configuration

The following secrets need to be configured in your GitHub repository settings:

1. `REACT_APP_FIREBASE_API_KEY` - Firebase API Key
2. `REACT_APP_FIREBASE_AUTH_DOMAIN` - Firebase Auth Domain
3. `REACT_APP_FIREBASE_PROJECT_ID` - Firebase Project ID
4. `REACT_APP_FIREBASE_STORAGE_BUCKET` - Firebase Storage Bucket
5. `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` - Firebase Messaging Sender ID
6. `REACT_APP_FIREBASE_APP_ID` - Firebase App ID
7. `FIREBASE_SERVICE_ACCOUNT` - Firebase Service Account JSON (for deployment)

## How to Generate Firebase Service Account

To generate a Firebase Service Account JSON:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Save the JSON file securely
6. Copy the entire contents of the JSON file and add it as a secret in your GitHub repository

## GitHub Actions Workflow

The GitHub Actions workflow is configured to:

1. Run linting and tests on every push and pull request
2. Build the React application with the Firebase configuration
3. Deploy to Firebase Hosting:
   - For pushes to main/master: Deploy to the live channel
   - For pull requests: Deploy to a preview channel and add a comment with the URL

## Firebase Configuration Files

Two Firebase configuration files are included:

1. `firebase.json` - Configures Firebase Hosting settings
2. `.firebaserc` - Specifies the Firebase project ID

## Manual Deployment

You can also manually trigger the deployment workflow by:

1. Going to the "Actions" tab in your GitHub repository
2. Selecting the "Firebase CI/CD" workflow
3. Clicking "Run workflow"
4. Selecting the branch to deploy from
5. Clicking "Run workflow"
