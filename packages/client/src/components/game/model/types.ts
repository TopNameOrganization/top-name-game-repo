import { Tile, AnimationPhase } from "../constants";

export type PositionType = {
  x: number,
  y: number,
};

export type CheckCollisionType = {
  position: PositionType,
  phase: AnimationPhase,
  isEnd: boolean,
}

export type RunnerInfoType = PositionType & {
  phase: AnimationPhase,
  direction: number,
};

export type LevelMapType = Tile[][];

export type LevelType = {
  level: LevelMapType,
  player: PositionType,
  bonuses: number,
  enemies: Array<PositionType>,
}

// TODO: всё кроме Update - это неточно
export enum ModelEvents {
  Update = 'update',
  UpdateWorld = 'updateWorld',
  GameStart = 'start',
  Message = 'message',
  LevelUp = 'levelUp',
  UpdateScore = 'updateScore',
  UpdateRest = 'updateRest',
  GameOver = 'over',
};

export enum MessageType {
  Hide = 'hide',
  Pause = 'pause',
  Message = 'message',
};

export type ModelMessageType = {
  type: MessageType,
  noRest?: boolean,
  title?: string,
  message?: string,
};
