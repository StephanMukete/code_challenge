// recursively merge log entries

module.exports = function merge(
  logEntry,
  entriesArray,
  leftIndex = 0,
  rightIndex = entriesArray.length - 1
) {
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
