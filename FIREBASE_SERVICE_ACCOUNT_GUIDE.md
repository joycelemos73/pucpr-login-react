# Adding Firebase Service Account to GitHub Secrets

This guide explains how to properly add your Firebase Service Account JSON as a GitHub secret for use in your CI/CD workflow.

## Understanding GitHub Secrets

GitHub secrets are encrypted environment variables that you can create in your repository or organization. They allow you to store sensitive information securely.

## Firebase Service Account Secret

When adding your Firebase Service Account as a GitHub secret:

1. **Secret Name (Key)**: Use `FIREBASE_SERVICE_ACCOUNT` as the name of your secret
2. **Secret Value**: The entire JSON content of your service account file

## Step-by-Step Guide

1. Generate your Firebase Service Account JSON file:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely on your computer

2. Open the downloaded JSON file with a text editor
   - The file will look something like this:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "abc123...",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAA...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-abc123@your-project-id.iam.gserviceaccount.com",
     "client_id": "123456789",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-abc123%40your-project-id.iam.gserviceaccount.com"
   }
   ```

3. Copy the **entire content** of the JSON file, including all curly braces, quotes, and special characters

4. Add the secret to your GitHub repository:
   - Go to your GitHub repository
   - Click on "Settings" > "Secrets and variables" > "Actions"
   - Click "New repository secret"
   - For the name, enter: `FIREBASE_SERVICE_ACCOUNT`
   - For the value, paste the entire JSON content you copied
   - Click "Add secret"

## Important Notes

- GitHub automatically handles the escaping of special characters in secrets, so you don't need to modify the JSON content
- Copy the JSON content exactly as it appears in the file, including all curly braces `{}`, quotes, newlines, etc.
- Make sure there are no extra spaces or characters added when copying
- The secret name is case-sensitive, so use `FIREBASE_SERVICE_ACCOUNT` exactly as shown

## Verification

You can verify that your secret is properly set up by checking if it appears in the list of secrets in your repository settings. The value will be hidden for security reasons, but you should see the name `FIREBASE_SERVICE_ACCOUNT` in the list.

## Usage in Workflow

The secret is already properly configured in your workflow file:

```yaml
- name: Deploy to Firebase Hosting
  uses: FirebaseExtended/action-hosting-deploy@v0
  with:
    repoToken: ${{ secrets.GITHUB_TOKEN }}
    firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
    channelId: live
    projectId: ${{ secrets.REACT_APP_FIREBASE_PROJECT_ID }}
```

This configuration will use your Firebase Service Account JSON to authenticate with Firebase during the deployment process.
