## Using The App
### Working With Timelines
A Timeline is a sequence of work and break intervals that can help you track your screen time with the help of timers.
<br/><br/>
Go to the Timeline screen by clicking the **Timeline** tab in the top navigation:

![timelinescreen](https://github.com/Sharpirate/need-to-break/assets/20927667/b9ad42ea-ac12-4ea9-b116-162c5fd20e4b)
<br/><br/>

Use the **Timeline Duration** and **Interval Size** controls to create your timeline:

![timdur](https://github.com/Sharpirate/need-to-break/assets/20927667/c6ff66c6-792d-4080-96f3-62f177652004)
<br/><br/>

The generated Timeline will appear at the bottom of the page and it will be updated automatically every time you make a change.
<br/><br/>
Once you are done making changes, click on the **Start** button to start the Timeline:

![starttim](https://github.com/Sharpirate/need-to-break/assets/20927667/8b79c4b1-3dd5-4685-aeee-6da9b5bd47ee)
<br/><br/>

Once you start the Timeline, you will see the active Timeline screen. Here you can keep track of your work and break intervals.
<br/><br/>
Cick on the **Stop Timeline** button if you want to delete the current active Timeline and start over:

![stop](https://github.com/Sharpirate/need-to-break/assets/20927667/85c3cc90-4a7f-48cf-8487-7b41c3727cf3)
<br/><br/>

### Using Presets
You can save a Timeline to your account for later use. This is called a **Preset**.
<br/><br/>
Create a new Timeline from the Timeline screen and click the **Save** button:

![savetim](https://github.com/Sharpirate/need-to-break/assets/20927667/2bc7a871-cfe9-4be9-8ec9-071b272d32c2)
<br/><br/>

You will see a modal prompting you to create an account.
<br/><br/>
Enter your username and password and click the **Sign Up** button:

![signupclick](https://github.com/Sharpirate/need-to-break/assets/20927667/bbc1b5cf-b594-459a-8ba3-4e10c8deed62)
<br/><br/>

Once you create your account you, click on the **Save** button once again. You should see a new modal appear prompting you to save your timeline.
<br/><br/>
Enter the name of your Preset and click the **Save** button:

![savepre](https://github.com/Sharpirate/need-to-break/assets/20927667/76ca3342-8119-4ffe-ae93-d306a0dc2c56)
<br/><br/>

Once you have saved your Preset, you will be redirected to the **Presets** screen where you can manage all of your Presets.
<br/><br/>
To delete a Preset, click on the **Delete** button:

![delpre](https://github.com/Sharpirate/need-to-break/assets/20927667/e30d9f20-6d8b-4ef9-b0ff-372dd1f40f32)
<br/><br/>

You will see a modal prompting you to delete the preset.
<br/><br/>
Click on the **Delete** button:

![delmodal](https://github.com/Sharpirate/need-to-break/assets/20927667/dbf7777a-6e84-4bf0-8b1f-0b97b96ec31b)

## Local Setup
### 1. Install Packages
Clone the repo and run `npm install` from the repository's root to install the required package dependencies

### 2. Running Locally
Run `npm run dev` from the repository's root to start the local dev build.

Go to `localhost:3000` to access the app:

![local](https://github.com/Sharpirate/need-to-break/assets/20927667/701b9c84-3aa7-436d-bf97-8a7fa712b303)
<br/><br/>

### (Optional) Configure Firebase
If you want to be able to save presets you need to connect the app to Firebase.

Go to https://firebase.google.com/ and create a new Web app.

Go to https://console.firebase.google.com/ and find your app's `firebaseConfig`.

Create a file called `.env.development.local` in the project's root and set your environment variables to match the `firebaseConfig`\
(You can reference the provided example `.env.development` file):

![envlocal](https://github.com/Sharpirate/need-to-break/assets/20927667/4e12dae0-cb5e-4baf-9996-f17da9266ab5)
<br/><br/>

Restart the dev server by running `npm run dev` again.

You should be able to create an account and save presets.
