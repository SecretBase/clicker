import { gameData } from "./gameData";
import { fromEvent, animationFrameScheduler } from "rxjs";
import { gameTick$ } from "./broadcastChannels";

const totalCounterDom = document.getElementById("total-counter-display");
const plusOneButton = document.getElementById("plus-one-button");

const buyAutoClick = document.getElementById(
  "buy-auto-click"
) as HTMLButtonElement;
const autoClickCounterDom = document.getElementById("auto-click-counter");

const render = (gameData) => {
  totalCounterDom.textContent = String(gameData.totalCount);
  autoClickCounterDom.textContent = `${String(gameData.autoClickCount)} Cost: ${
    gameData.autoClickCost
  }`;

  buyAutoClick.disabled = gameData.autoClickCost > gameData.totalCount;
};

const initGameData = (gameData) => {
  animationFrameScheduler.schedule(
    function (gameData) {
      render(gameData);
      this.schedule(gameData);
    },
    0,
    gameData
  );

  fromEvent(plusOneButton, "click").subscribe(() => (gameData.totalCount += 1));
  fromEvent(buyAutoClick, "click").subscribe(() => {
    gameData.totalCount = gameData.totalCount - gameData.autoClickCost;
    gameData.autoClickCount += 1;
    gameData.autoClickCost = gameData.autoClickCount;
  });

  gameTick$.subscribe(() => {
    gameData.totalCount += gameData.autoClickCount;
  });
};

initGameData(gameData);
