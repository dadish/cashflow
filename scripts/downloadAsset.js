const path = require("path");
const process = require("process");
const request = require("request");
const fs = require("fs-extra");

module.exports = filepath =>
  new Promise((resolve, reject) => {
    const filename = path.resolve(`${process.cwd()}/src/${filepath}`);
    request
      .get(`https://www.richdad.com/cmsscripts/custom/cashflowjs/${filepath}`)
      .on("error", reject)
      .on("end", resolve)
      .pipe(fs.createWriteStream(filename));
  });
