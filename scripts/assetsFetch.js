const process = require("process");
const path = require("path");
const fs = require("fs-extra");
const ora = require("ora");
const pify = require("pify");
const rimraf = require("rimraf");

const manifest = require("../src/assets");
const downloadAsset = require("./downloadAsset");

async function assetsFetch() {
  let spinner = ora("Cleaning up assets").start();
  await pify(rimraf)(path.resolve(`${process.cwd()}/src/assets/audio`));
  await pify(rimraf)(path.resolve(`${process.cwd()}/src/assets/data`));
  await pify(rimraf)(path.resolve(`${process.cwd()}/src/assets/fonts`));
  await pify(rimraf)(path.resolve(`${process.cwd()}/src/assets/img`));
  spinner.succeed();

  spinner = ora();
  spinner.info("Downloading data...");
  spinner.start();
  for (let i = 0; i < manifest.length; i++) {
    const resource = manifest[i];
    const filename = path.resolve(`./src/${resource.src}`);
    spinner.text = resource.src;
    const fileExists = await fs.exists(filename);
    if (fileExists) {
      continue;
    }
    await fs.ensureFile(filename);
    await downloadAsset(resource.src);
  }
  spinner.succeed("Assets fetching finished!");
}

assetsFetch();
