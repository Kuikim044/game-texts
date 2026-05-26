const fs = require("fs");

const data = JSON.parse(fs.readFileSync("feedback.json", "utf8"));
fs.writeFileSync("feedback-data.js", `window.FEEDBACK_DATA = ${JSON.stringify(data, null, 2)};\n`, "utf8");
