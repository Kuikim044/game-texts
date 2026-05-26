const fs = require("fs");
const vm = require("vm");

const app = fs.readFileSync("app.js", "utf8");
const feedback = JSON.parse(fs.readFileSync("feedback.json", "utf8"));

const sandbox = {
  document: {
    addEventListener() {},
    getElementById() {
      return {
        value: "",
        innerHTML: "",
        textContent: "",
        addEventListener() {},
        getContext() {
          return {};
        }
      };
    },
    querySelectorAll() {
      return [];
    }
  },
  setInterval() {},
  console
};

vm.createContext(sandbox);
vm.runInContext(`${app}\nthis.__verify = { analyzeFeedback, buildAnalytics };`, sandbox);

const rows = feedback.map(sandbox.__verify.analyzeFeedback);
const analytics = sandbox.__verify.buildAnalytics(rows);

console.log(JSON.stringify({
  sourceRows: feedback.length,
  analyzedRows: rows.length,
  firstRowFields: Object.keys(rows[0]).slice(0, 9),
  sentiments: analytics.sentiment,
  priorities: analytics.priority,
  topCategories: Object.entries(analytics.category).sort((a, b) => b[1] - a[1]).slice(0, 5),
  topIssues: analytics.topIssues.slice(0, 5),
  recommendationsEn: analytics.recommendations.en.length,
  recommendationsTh: analytics.recommendations.th.length
}, null, 2));
