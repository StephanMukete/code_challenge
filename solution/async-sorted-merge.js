"use strict";

const merge = require("./merge");

const appendIndex = async (logSource, index) => {
  let currentLog = await logSource.popAsync();
  currentLog ? (currentLog.index = index) : (currentLog = false);
  return currentLog;
};

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  // append indexes and sort dates in descending order
  let lastLogEntries = (await Promise.all(logSources.map(appendIndex))).sort(
    (a, b) => b.date - a.date
  );

  while (lastLogEntries.length > 0) {
    let oldestLogEntry = await lastLogEntries.pop();
    if (oldestLogEntry) {
      printer.print(oldestLogEntry);

      let logIndex = oldestLogEntry.index;
      let unsortedLogSource = await appendIndex(logSources[logIndex], logIndex);

      if (unsortedLogSource) {
        lastLogEntries = merge(unsortedLogSource, lastLogEntries);
      }
    }
  }
  printer.done();
};
