"use strict";

const merge = require("./merge");

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
