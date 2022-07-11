const merge = require("../solution/merge");

const recentEntry = {
  date: new Date(),
  msg: "Enhanced directional moratorium",
};
const oldEntry = {
  date: new Date("2022-05-31T02:37:46.155Z"),
  msg: "Visionary local complexity",
};
const midEntry = {
  date: new Date("2022-06-31T02:37:46.155Z"),
  msg: "Virtual user-facing approach",
};
const defaultEntry = {
  date: new Date("2022-04-31T02:37:46.155Z"),
  msg: "ersevering didactic encryption",
};

describe("merge function", () => {
  test("when log entries array is empty", () => {
    let handler = merge(recentEntry, []);
    expect(handler).toStrictEqual([recentEntry]);
  });

  test("when entry date is greater than leftIndex date", () => {
    let handler = merge(recentEntry, [oldEntry]);
    expect(handler).toStrictEqual([recentEntry, oldEntry]);
  });

  test("when entryDate is less than leftDate and rightDate", () => {
    let es = [
      { date: "2022-05-16T08:57:49.218Z", msg: "Devolved cohesive success" },
      recentEntry,
    ];
    let handler = merge(oldEntry, [midEntry, recentEntry]);
    expect(handler).toStrictEqual([midEntry, recentEntry, oldEntry]);
  });

  test("when entryDate is  >= midDate but < leftIndex and > rightIndex", () => {
    let handler = merge(oldEntry, [midEntry, defaultEntry, defaultEntry]);
    expect(handler).toStrictEqual([
      midEntry,
      oldEntry,
      defaultEntry,
      defaultEntry,
    ]);
  });
});
