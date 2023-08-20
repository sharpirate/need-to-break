### 1. Install Packages
Clone the repo and run `npm install` from the repository's root to install the required package dependencies

### 2. Running Locally
Run `npm run dev` from the repository's root to start the local dev build.

Go to `localhost:3000` to access the app:

![homepage](https://github.com/Sharpirate/need-to-break/assets/20927667/f452acb9-d812-4ba6-a55a-2ee56176f402)

### 3. (Optional) Configure Firebase
If you want to be able to save presets you need to connect the app to Firebase.

Go to https://firebase.google.com/ and create a new Web app.

Go to https://console.firebase.google.com/ and find your app's `firebaseConfig`.

Create a file called `.env.development.local` in the project's root and set your environment variables to match the `firebaseConfig`\
(You can reference the provided example `.env.development` file):

![env](https://github.com/Sharpirate/need-to-break/assets/20927667/87cd4607-ec66-41b7-a48f-2113c06650dd)

Restart the dev server by running `npm run dev` again.

You should be able to create an account and save presets.
