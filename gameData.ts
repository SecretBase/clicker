import { getGameUpdateChannel } from "./broadcastChannels";

const channel = getGameUpdateChannel();

export interface GameData {
  totalCount: number;
  autoClickCount: number;
  autoClickCost: number;
}

const gameProxyHandler = {
  set: function (object, prop, value) {
    object[prop] = value;
    channel.postMessage({ type: prop, data: object[prop] });
    return true;
  },
};

export const gameData = new Proxy<GameData>(
  { totalCount: 0, autoClickCount: 0, autoClickCost: 1 },
  gameProxyHandler
);
