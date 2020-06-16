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

## Code Setup

1. Clone or download the repo: [https://github.com/kmaida/gatsby-speakerbot.git](https://github.com/kmaida/gatsby-speakerbot.git) to your machine.
2. From the cloned directory, run `$ npm install` to install dependencies.
3. Remove `-sample` from the `.env-sample` filename. 
4. Open the `.env` file and add your Slack workspace name to the `SLACK_TEAM` variable (e.g., `SLACK_TEAM=kim-testing-ground`).
5. Open your Slack workspace _in the web browser_ by navigating to its URL (e.g., `https://[your-team-name].slack.com`). The URL will update automatically to look like this: `https://app.slack.com/client/[TXXXXXX]`. Copy the segment of the URL that begins with "T". This is your `SLACK_TEAM_ID`. Add it to the `.env` file. We will begin filling in the other environment variables as we proceed with Slack Setup.

## Slack Setup

It's time to set up your new Slack app that will become Speakerbot. We'll need credentials from the Slack app in order to set our environment variables for the app's code to run properly.

1. Make sure you're signed into your new Slack workspace.
2. Go to the [Slack App API](https://api.slack.com/apps) and click the **Create New App** button.
3. Name your app `Speakerbot` and select your Development Slack Workspace. Click **Create App**.
4. Next, follow the steps below going section-by-section through the Slack App settings and features:

### Basic Information

**App Credentials**

Copy the App ID, Signing Secret, 