import { Runner as RunnerType } from './Runner';
import { CheckCollisionType, PositionType } from './types';
import { checkCollision } from './checkCollision';
import { RunnerAction, Tile, OBSTACLE, TileSize } from '../constants';
import { getTileAt, worldToMap } from '../utils';

const checkNode = ({ x, y }: PositionType, action: RunnerAction): Array<RunnerAction> => {
  const res: Array<RunnerAction> = [];
  const center = getTileAt({ x, y });
  const bottom = getTileAt({ x, y: y + 1 });
  const top = getTileAt({ x, y: y - 1 });
  const left = getTileAt({ x: x - 1, y });
  const leftB = getTileAt({ x: x - 1, y: y + 1 });
  const right = getTileAt({ x: x + 1, y });
  const rightB = getTileAt({ x: x + 1, y: y + 1 });

  if ([center, bottom].includes(Tile.Stair)) {
    if (OBSTACLE.includes(left) && OBSTACLE.includes(right)) {
      return res;
    }
    if (left === Tile.Rope ||
      ([Tile.Brick, Tile.Concrete].includes(leftB) && !OBSTACLE.includes(left))) {
      res.push(RunnerAction.MoveLeft);
    }
    if (right === Tile.Rope ||
      ([Tile.Brick, Tile.Concrete].includes(rightB) && !OBSTACLE.includes(right))) {
      res.push(RunnerAction.MoveRight);
    }
    if (center === Tile.Stair) {
      if (!OBSTACLE.includes(top)) {
        res.push(RunnerAction.MoveUp);
      }
      if (!OBSTACLE.includes(bottom)) {
        res.push(RunnerAction.MoveDown);
      }
    } else {
      res.push(RunnerAction.MoveDown);
    }
  }

  const opp = RunnerAction.MoveLeft + ((action - RunnerAction.MoveLeft) + 2) % 4;
  return res.filter((action) => action !== opp);
}

export const agent = (dTime: number, actor: RunnerType): CheckCollisionType => {
  const { action, orientation } = actor;
  const { position, phase, isEnd } = checkCollision(dTime, actor);

  const currAtMap = worldToMap({
    x: actor.x + TileSize / 2,
    y: actor.y + TileSize / 2
  });
  const nextAtMap = worldToMap({
    x: position.x + TileSize / 2,
    y: position.y + TileSize / 2
  });

  if (currAtMap.x !== nextAtMap.x || currAtMap.y !== nextAtMap.y) {
    const dirs = checkNode(nextAtMap, action);
    if (dirs.length > 0) {
      const n = Math.floor(Math.random() * dirs.length);
      actor.setAction(dirs[n]);
      return { position: { x: position.x, y: position.y }, phase, isEnd };
    }
  } else if (isEnd) {
    switch (action) {
      case RunnerAction.MoveDown:
        actor.setAction(RunnerAction.MoveUp);
        break;
      case RunnerAction.MoveUp:
        actor.setAction(RunnerAction.MoveDown);
        break;
      case RunnerAction.MoveLeft:
        actor.setAction(RunnerAction.MoveRight);
        break;
      case RunnerAction.MoveRight:
        actor.setAction(RunnerAction.MoveLeft);
        break;
      default:
    }
  }

  if (action === RunnerAction.Stay) {
    actor.setAction(orientation === 1 ? RunnerAction.MoveRight : RunnerAction.MoveLeft);
  }

  return { position, phase, isEnd };
}
