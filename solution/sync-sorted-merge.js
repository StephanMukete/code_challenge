"use strict";
// recursively merge log entries
const merge = (
  logEntry,
  entriesArray,
  leftIndex = 0,
  rightIndex = entriesArray.length - 1
) => {
  // using unsigned right shift operator for better memory management
  let midIndex = leftIndex + ((rightIndex - leftIndex) >>> 1);
  if (entriesArray.length < 1) {
    return [logEntry];
  }
  const entryDate = logEntry.date,
    leftDate = entriesArray[leftIndex].date,
    midDate = entriesArray[midIndex].date,
    rightDate = entriesArray[rightIndex].date;

  if (entryDate >= leftDate) {
    return [
      ...entriesArray.slice(0, leftIndex),
      logEntry,
      ...entriesArray.slice(leftIndex),
    ];
  }

  if (entryDate <= rightDate) {
    return [
      ...entriesArray.slice(0, rightIndex + 1),
      logEntry,
      ...entriesArray.slice(rightIndex + 1),
    ];
  }
  if (entryDate >= midDate) {
    return merge(logEntry, entriesArray, leftIndex, midIndex);
  } else {
    return merge(logEntry, entriesArray, midIndex + 1, rightIndex);
  }
};

const appendIndex = (logSource, index) => {
  let currentLog = logSource.pop();
  currentLog ? (currentLog.index = index) : (currentLog = false);
  return currentLog;
};

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  // append indexes and sort dates in descending order
  let lastLogEntries = logSources
    .map(appendIndex)
    .sort((a, b) => b.date - a.date);

  while (lastLogEntries.length > 0) {
    let oldestLogEntry = lastLogEntries.pop();
    if (oldestLogEntry) {
      printer.print(oldestLogEntry);
      let logIndex = oldestLogEntry.index;
      let unsortedLogSource = appendIndex(logSources[logIndex], logIndex);
      if (unsortedLogSource) {
        lastLogEntries = merge(unsortedLogSource, lastLogEntries);
      }
    }
  }
  printer.done();
};

module.exports.merge = merge;
