const process = require("process");
const path = require("path");
const fs = require("fs-extra");
const ora = require("ora");

const downloadAsset = require("./downloadAsset");
const manifest = require("../src/assets");

async function assetsFetchImages() {
  const spinner = ora();
  spinner.info("Downloading images...");
  spinner.start();
  for (let i = 0; i < manifest.length; i++) {
    const resource = manifest[i];
    if (!resource.isSpritesheet) {
      continue;
    }
    const filename = path.resolve(`${process.cwd()}/src/${resource.src}`);
    const fileExists = await fs.exists(filename);
    if (!fileExists) {
      continue;
    }
    const data = await fs.readJSON(filename);
    const images = data.images;
    for (let m = 0; m < images.length; m++) {
      spinner.text = images[m];
      const imgFilename = path.resolve(`${process.cwd()}/src/${images[m]}`);
      const imageExists = await fs.exists(imgFilename);
      if (imageExists) {
        continue;
      }
      await fs.ensureFile(imgFilename);
      await downloadAsset(images[m]);
    }
  }
  spinner.succeed("Finished downloading images.");
}

assetsFetchImages();
