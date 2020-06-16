# Development: Airtable Setup

You should already have an [Airtable](https://airtable.com) account, as detailed in the [Prerequisites](development.md#prerequisites).

Now we need to set up a base and table to store events and event reports.

1. Log into Airtable. The dashboard defaults to the Bases view.
2. Click the `+` icon to `Add a base`.
3. In the dropdown, choose **Start from scratch**.
4. Name your base whatever you want (it's the _table_ name that will become significant for our Speakerbot app, which we'll add in a minute). You can also select a color and an icon for your base. A base is a _collection_ of tables.
5. Once your base is set up, click on it to open it. You will see an empty table in grid view. Your view should look something like this:
![Airtable with blank table](airtable-table1.png)
6. Rename "Table 1" to a name of your choosing. This will be the table where Speakerbot saves and reads data. For example, at Gatsby, this table is called `Gatsby Speakers`.
7. Modify/add the table fields as follows. It's very important that the fields be named and formatted _exactly_ as shown, otherwise, the app will not be able to read or save the data properly without further code edits:
  * **Name** | Single line text
  * **Date** | Date | Date format: `ISO (2020-06-16)`
  * **Location** | Single line text
  * **Event URL** | Single line text
  * **Who's speaking?** | Single line text
  * **Event Type** | Single select
    * `Conference`
    * `Workshop`
    * `Meetup`
    * `Podcast`
    * `Work event`
    * `Livestream`
    * `Webinar`
    * `Other`
  * **Topic** | Single line text
  * **Notes** | Long text (no rich text formatting)
  * **Followup** | Date | Date format: `ISO (2020-06-16)`
  * **Est. Reach** | Number | Format: `Integer (2)` (do not allow negative numbers)
  * **Content Links** | Long text (no rich text formatting)
  * **Event Rating** | Single select
    * `1`
    * `2`
    * `3`
    * `4`
  * **Post Event Report** | Long text (Enable rich text formatting)
  * **Submitter Slack ID** | Single line text