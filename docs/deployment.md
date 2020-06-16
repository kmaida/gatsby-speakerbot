# Deployment

Your Slack app must be deployed to a web server. You should **not** deploy the app to an [ephemeral disk](https://devcenter.heroku.com/articles/active-storage-on-heroku#ephemeral-disk).

## Hosting Recommendations

* If you're _comfortable with DevOps_, have a domain name, don't mind paying a monthly subscription, and also don't mind doing a decent amount of setup work: [DigitalOcean VPS](https://www.digitalocean.com/)
* If you want to _get up and running quickly_ and don't mind paying a small monthly subscription per app: [Heroku hobby dyno](https://devcenter.heroku.com/articles/dyno-types)

The VPS route is more complex, and has additional requirements such as:

* Linux DevOps
* nginx
* SSL (e.g., with LetsEncrypt)
* a domain name

If you're experienced with these technologies, feel free to set up your Node.js Slack app on your VPS. Just make sure the app is available on a public domain and encrypted with SSL.

For simplicity and expediency, **this guide will walk you through setting up your Slack App on a Heroku hobby dyno**.

## Set Up Production Airtable, MongoDB, and Slack

Follow the [development instructions](development.md) again with your [production Airtable account](development-airtable.md), [production MongoDB Atlas account](development-mongodb.md), and [production Slack app](development-slack-app.md). Once these have been set up, we can deploy to Heroku and update our 

## Deploying to Heroku

1. Sign up for a free [Heroku](https://signup.heroku.com/) account.
2. Create a new app, give it a unique name, and select a region. Click the "Create app" button.
3. Open your app's Heroku settings.
4. In the **Config Vars** section, add the production environment configuration variables. Heroku uses these variables (not an `.env` file).
5. In the **Resources** section, click the "Change Dyno Type" button.
6. Select **Hobby** and click the button to subscribe. (Free dynos do not work for Slack apps because they go to sleep, and this causes long wake-up times and delays when users try to interact with the sleeping bot.)
7. In the **Deploy** section, you can deploy your application in the way that you prefer. I like to use `Heroku Git` because it provides a `heroku` remote that I can push to as desired. Follow the provided instructions to deploy using your preferred method.

> **Note:** After deploying, you can check your application in the browser by navigating to its URL (e.g., `https://[your-Heroku-app].herokuapp.com`). If it's properly deployed, you should see a `GET` request error (because it does not have a home page route since it's a Slack app). If you see a Heroku error instead, something has gone wrong.

## Update Slack App Settings

In your Slack App settings, you'll need to replace your local tunnel URL with your deployed Heroku app's URL. Your Heroku URL is `https://[your-Heroku-app].herokuapp.com`.

1. Open your production Slack App settings in the browser.
2. In **Interactivity**, update the Request URL to `https://[your-Heroku-app].herokuapp.com/slack/events`.
3. In **Slash Commands**, update both slash commands to use the Request URL `https://[your-Heroku-app].herokuapp.com/slack/events`.
4. In **Event Subscriptions**, update the Request URL to `https://[your-Heroku-app].herokuapp.com/slack/events`.

> **Note:** If, for some reason, it doesn't seem like your Slack app is working properly, try re-installing it, making sure that you're installing in the correct Slack workspace and with the production request URLs. Double-check your configuration variables in Heroku as well. If you're using the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line), you can see the stream of logs using this terminal command:
```
$ heroku logs --app=[heroku-app-name] --tail
```