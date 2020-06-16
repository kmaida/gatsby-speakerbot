# How to Use Speakerbot

Once Speakerbot has been installed in your Slack workspace, **all users can interact with the bot to do several things:**

* List new upcoming events
* Submit post-event reports
* Designated Channel: View a weekly roundup of upcoming events across the company (shared every Monday)
* Designated Channel: View details of new event listings and reports (shared as they are submitted)
* DM: Receive followup prompts to submit event reports once an event has taken place
* [App Home](slack://app?team=T6VN36NMP&id=A0157QBDE49&tab=home): See a list of their own past events that need reports and add reports
* [App Home](slack://app?team=T6VN36NMP&id=A0157QBDE49&tab=home): See a list of their upcoming events and edit them
* [App Home](slack://app?team=T6VN36NMP&id=A0157QBDE49&tab=home): See a list of their post-event reports and edit them

## Slash Commands

* Type `/speaking-new` in Slack and Speakerbot will open a new event form for you to fill out.
* Type `/speaking-report` in Slack and Speakerbot will open a post-event form for you to fill out.

![slash commands screenshot](slash-commands.png)

## Shortcuts

Speakerbot provides [global shortcuts](https://api.slack.com/interactivity/shortcuts) that can be used to list upcoming speaking events and submit post-event reports. They can be accessed through the shortcut menu in Slack, which is represented by a lightning bolt icon on the bottom left of the message input area as shown below:

![shortcuts screenshot](shortcuts.png)

## App Home

The [App Home](slack://app?team=T6VN36NMP&id=A0157QBDE49&tab=home) is the central hub for `@Speakerbot`. You can perform all the app's essential functions from this location.

### List Events and Add Reports

You can use the buttons available in the top of App Home to list new upcoming events and add new event reports:

![image of App Home with new event and report buttons](app-home.png)

### Add Post-Event Reports for Completed Events

![image of App Home with event report button](add-report.png)

## Scheduled Followups

When you submit a new upcoming speaking event, Speakerbot will notify you after your event date has elapsed to prompt you to fill out a post-event report.

![screenshot of DM followup](scheduled-followup.png)
