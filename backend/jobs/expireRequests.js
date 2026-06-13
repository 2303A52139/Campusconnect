const cron = require("node-cron");
const Request = require("../models/Request");

const startExpireRequestsJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const result = await Request.updateMany(
        {
          status: "Pending",
          expiresAt: { $lt: new Date() }
        },
        {
          status: "Expired"
        }
      );

      console.log(
        "Expired Requests Updated:",
        result.modifiedCount
      );
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = startExpireRequestsJob;