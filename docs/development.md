# Development

Speakerbot is custom-built for internal team use at [Gatsby](https://gatsbyjs.com) (therefore, it has several references in it to Gatsby Developer Relations goals, motivations, and internal docs). However, it is freely available open-source, and can be forked and modified to suit your needs.

## Prerequisites

* A Slack Workspace ([you can create one for free here](https://slack.com/get-started#/create))
* [NodeJS](https://nodejs.org/en/) (LTS recommended)
* _([node package manager (npm)](https://www.npmjs.com/get-npm); this is installed with Node, you should not need to install it separately)_
* An [Airtable](https://airtable.com) account ([you can sign up for free here](https://airtable.com/signup))
* A [MongoDB Atlas](https://mongodb.com) account ([you can sign up for free here](https://www.mongodb.com/try))
* An [ngrok](https://ngrok.com) account ([you can sign up for free here](https://dashboard.ngrok.com/signup))
* [ngrok for desktop](https://dashboard.ngrok.com/get-started/setup) (log into ngrok and then follow instructions to download the ngrok binary)

## Initial Setup

1. Clone or download the repo: [https://github.com/kmaida/gatsby-speakerbot.git](https://github.com/kmaida/gatsby-speakerbot.git) to your machine.
2. From the cloned directory, run `$ npm install` to install dependencies.
3. Remove `-sample` from the `.env-sample` filename. 
4. Open the `.env` file and add your Slack workspace name to the `SLACK_TEAM` variable (e.g., `SLACK_TEAM=kim-testing-ground`).
5. Open your Slack workspace _in the web browser_ by navigating to its URL (e.g., `https://[your-team-name].slack.com`). The URL will update automatically to look like this: `https://app.slack.com/client/[TXXXXXX]`. Copy the segment of the URL that begins with "T". This is your `SLACK_TEAM_ID`. Add it to the `.env` file.
6. Create a new channel in your Slack workspace where you'd like Speakerbot to output notifications about new events and reports. Navigate to the channel _in the web browser_. The URL will look like this: `https://app.slack.com/client/[SLACK_TEAM_ID]/[CXXXXXX]`. Copy the URL segment that begins with "C". This is your `SLACK_CHANNEL_ID`. Add it to your `.env` file. (Once we set up our Slack app, we will need to invite `@Speakerbot` into this channel so it can post there).
7. View your own user profile in Slack. You can do this by clicking the Direct Message with yourself, and then clicking on your profile image / name in the DM space. This will open your profile in a sidebar. Click on the ellipsis `... / More` item and then select **Copy member ID** from the dropdown. Paste your Slack member ID into the `.env` file as the `SLACK_ADMINS` variable. This will set you as a Speakerbot admin by default.

We will begin filling in the other environment variables as we proceed with Slack App Setup:

## Slack App Setup

It's time to set up your new Slack app that will become Speakerbot. We'll need credentials from the Slack app in order to set our environment variables for the app's code to run properly.

1. Make sure you're signed into your new Slack workspace.
2. Go to the [Slack App API](https://api.slack.com/apps) and click the **Create New App** button.
3. Name your app `Speakerbot` and select your Development Slack Workspace. Click **Create App**.
4. Next, follow the steps below going section-by-section through the Slack App settings and features:

### Basic Information

**App Credentials**

* Copy the **App ID** and add it to your `.env` file's `SLACK_APP_ID`.
* Copy the **Signing Secret** and add it to your `.env` file's `SLACK_SIGNING_SECRET`.

**Display Information**

You'll need to give your app a name and short description. You can also provide an app icon and background color if you wish. Make sure your app is named `Speakerbot`. A short description might be something like:

```
I'm your friendly Speaking Events Manager Bot
```

### App Home

**Your App's Presence in Slack**

You can modify your app's display name and bot name here. The bot's name should be `Speakerbot`.

* Always Show My Bot as Online: `on`

**Show Tabs**

* Home Tab: `on`
* Messages Tab: `on`

### Incoming Webhooks

**Activate Incoming Webhooks**: `on`

## Install Slack App

At this point, we need to install our Slack app to our Slack workspace to generate a bot token. Go to the **Install App** sidebar item in your Slack App Settings and click the **Install App** button.

You will receive a prompt telling you that Speakerbot is requesting permission to access your workspace. You may also be prompted to choose the channel that Speakerbot posts to as an app. Select the channel you created in the [Initial Setup](#initial-setup) section above.

Click **Allow** to install the application. You will then have a **Bot User OAuth Access Token** available in your Slack App Settings. Copy this token and paste it into your `.env` file's `SLACK_BOT_TOKEN` variable.

## Start App Server and Ngrok Tunnel

At this point, you'll need to **start your app server and use [ngrok](https://ngrok.com) to provide a publicly-available forwarding tunnel** so you can finish adding your app's settings in Slack.

In your terminal or command prompt, navigate to the root directory of the folder where you've cloned the source code for this repository. Then run:

```
$ npm start
```

Next, start ngrok, forwarding to the localhost port that your app is running on (`8585` by default):

```
$ [./your/path/to/]ngrok http 8585
```

This will create a tunnel to your app on localhost. You can then access the app publicly in the browser at the URL provided by ngrok when the tunnel is created.

> **Note:** On a free plan, this URL will be different every time you restart ngrok. If you'd like to use a subdomain or reserve a domain to use all the time, you'll need to [upgrade to a paid plan](https://ngrok.com/pricing). I use and like the Basic plan, which is $5/month at the time of this writing, and provides custom subdomains and 3 reserved domains per user.

### Interactivity & Shortcuts

**Interactivity**: `on`

* Request URL: `https://[your-ngrok-tunnel].ngrok.io/slack/events`

**Shortcuts**

Create a new _global_ shortcut:

* Name: `List a speaking event`
* Short Description: `List an upcoming speaking event (conference, meetup, workshop, podcast, etc.)`
* Callback ID: `list_event`

Create a new _global_ shortcut:

* Name: `Submit event report`
* Short Description: `Tell us how your speaking event went (insights, outcomes, audience, etc.)`
* Callback ID: `event_report`

### Slash Commands

Create a new command:

* Command: `/speaking-new`
* Request URL: `https://[your-ngrok-tunnel].ngrok.io/slack/events`
* Short Description: `List a new / upcoming event`
* Escape channels, users, and links sent to your app: `off`

Create a new command:

* Command: `/speaking-report`
* Request URL: `https://[your-ngrok-tunnel].ngrok.io/slack/events`
* Short Description: `Tell us how your speaking event went`
* Escape channels, users, and links sent to your app: `off`

### OAuth & Permissions

**OAuth Tokens & Redirect URLs**

Copy the `Bot User OAuth Access Token` and paste it into your `.env` file as `SLACK_BOT_TOKEN`.

**Scopes**

Add the following Bot Token OAuth Scopes / make sure these scopes are present:

* `app_mentions:read`
* `chat:write`
* `commands`
* `im:history`
* `incoming-webhook`

### Event Subscriptions

**Enable Events**: `On`

* Request URL: `https://[your-ngrok-tunnel].ngrok.io/slack/events`

**Subscribe to bot events**

Add the following Bot User Events:

* `app_home_opened`
* `app_mention`
* `message.im`