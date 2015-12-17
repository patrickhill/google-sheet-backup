# Google Sheets Auto Backup to CSV

This script will backup specified sheets in a Google spreadsheet to CSV files so you always have application agnostic copies of your data.

## Basic Usage Instructions
* Open a Google sheet
* From the main menu, click Tools > Script editor...
* Copy and paste this Javascript into the window
* Name and save the file
* Edit variables for sheet names and Google Drive folder destination
* From the main menu, click Run > backupFiles
* The script will run and you should see the backup CSV files in your Drive folder

## Automation
To automate this script running process do the following:

* From the main menu, select Resources > Current project's triggers
* Click "Add new trigger"
* Select "backupFiles" from the Run dropdown menu
* Select when you'd like the script to run
* Click "Save"