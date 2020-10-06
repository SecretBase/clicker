import { fromEvent, interval } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

export interface GameDataEvent {
  type: string;
  data: any;
}

export const getGameUpdateChannel = () =>
  new BroadcastChannel("gameDataUpdateChannel");

export const source$ = fromEvent<MessageEvent<GameDataEvent>>(
  getGameUpdateChannel(),
  "message"
)
  .pipe(map((e) => e.data))
  .pipe<GameDataEvent>(tap(console.debug));

export const totalCountUpdated$ = source$.pipe(
  filter((e) => e.type === "totalCount")
);

export const gameTick$ = interval(1000).pipe(tap(() => console.debug("tick")));
