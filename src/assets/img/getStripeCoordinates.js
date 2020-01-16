import background_01 from "assets/img/background_01.json";
import board from "assets/img/board.json";
import chat from "assets/img/chat.json";
import dice from "assets/img/dice.json";
import fasttrack from "assets/img/fasttrack.json";
import loadingscreen from "assets/img/loadingscreen.json";
import statement from "assets/img/statement.json";
import ui from "assets/img/ui.json";
import ui2 from "assets/img/ui2.json";

const collections = {
  background: background_01,
  board: board,
  chat: chat,
  dice: dice,
  "fast-track": fasttrack,
  "loading-screen": loadingscreen,
  statement: statement,
  ui: ui,
  ui2: ui2
};

const collectionNames = Object.keys(collections).join(", ");

function getStripeCoordinates(collectionName, stripeName) {
  const collection = collections[collectionName];
  if (!collection) {
    throw new Error(
      `Incorrect collection name. Available collections are: ${collectionNames}.`
    );
  }
  const stripeData = collection.animations[stripeName];
  if (!stripeData) {
    const stripeNames = Object.keys(collection.animations).join(", ");
    throw new Error(
      `Incorreect stripe name for collection "${collectionName}". Available stripes are: ${stripeNames}.`
    );
  }
  const frameIndex = stripeData.frames[0];
  return collection.frames[frameIndex];
}

export default getStripeCoordinates;
