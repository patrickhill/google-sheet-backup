function createTimestamp() {
  var date = new Date();
  var y = date.getYear();
  var m = date.getMonth();
  var d = date.getDay();
  var hrs = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var timestamp = y + "-" + m + "-" + d + " " + hrs + "." + min + "." + sec;
  
  return timestamp;
}

function getFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  var folder;
  
  while (folders.hasNext()) {
   var folder = folders.next();
   //Logger.log(folder.getName());
   return folder;
  }
  return "No folder by that name";
}

function createFile(folderDestination, fileName, fileData) {
  var folder = getFolder(folderDestination);
  var timestamp = createTimestamp();
  var name = fileName + " " + timestamp + ".csv";
  
  folder.createFile(name, fileData);
}

// this converter came from: developers.google.com/apps-script/articles/docslist_tutorial?hl=en
function convertRangeToCsv(dataArray) {
  // Get the selected range in the spreadsheet
  //var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSelection();
  try {
    var data = dataArray;
    var csvFile = undefined;

    // Loop through the data in the range and build a string with the CSV data
    if (data.length > 1) {
      var csv = "";
      for (var row = 0; row < data.length; row++) {
        for (var col = 0; col < data[row].length; col++) {
          if (data[row][col].toString().indexOf(",") != -1) {
            data[row][col] = "\"" + data[row][col] + "\"";
          }
        }

        // Join each row's columns
        // Add a carriage return to end of each row, except for the last one
        if (row < data.length-1) {
          csv += data[row].join(",") + "\r\n";
        }
        else {
          csv += data[row];
        }
      }
      csvFile = csv;
    }
    //Logger.log(csvFile);
    return csvFile;
  }
  catch(err) {
    Logger.log(err);
    Browser.msgBox(err);
  }
}

function getSheetData(sheetName) { 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var startRow = 1;
  var startCol = 1;
  var endRow = sheet.getLastRow();
  //var endRow = 2;
  var endCol = sheet.getLastColumn();
  var data = sheet.getSheetValues(startRow, startCol, endRow, endCol);
  
  //Logger.log(data);
  
  // run formatData to clean everything up for export
  var formattedData = convertRangeToCsv(data);
  
  return formattedData;
}

function backupFiles() {
  // get the data
  var dataDaily = getSheetData("daily");
  var dataFull = getSheetData("full");

  // create the files
  createFile("backups","HelloHill Time - Daily",dataDaily);
  createFile("backups","HelloHill Time - Full",dataFull);
}


