const cron = require("cron");
const https = require("https");

const Jobs = new cron.CronJob("*/14 * * * *", function () {
  https.get(process.env.RENDER_URL, (res) => {
    if (res.statusCode === 200) {
      console.log("GET request sent successfully");
    }
  }).on("error", (e) => {
    console.error("Error while requesting:", e.message);
  });
});

module.exports = Jobs;
