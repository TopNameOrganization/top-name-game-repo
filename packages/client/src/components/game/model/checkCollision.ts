import { Tile, RunnerAction, AnimationPhase, TileSize, OBSTACLE } from '../constants'
import { CheckCollisionType } from './types';
import { Runner as RunnerType } from './Runner'
import { worldToMap, mapToWorld, getTileAt, checkFall } from '../utils';

export const checkCollision = (dTime: number, player: RunnerType): CheckCollisionType => {
  const { action } = player;
  const { x: xNew, y: yNew } = player.getNextPos(dTime);
  let x: number = xNew;
  let y: number = yNew;
  let isEnd = false;

  const collision = worldToMap(player.getCheckCollisionPoint({ x: xNew, y: yNew }));
  const tile = getTileAt(collision);
  const playerAtMap = worldToMap({ x: player.x + TileSize / 2, y: player.y + TileSize / 2 });
  const playerTile = getTileAt({ x: playerAtMap.x, y: playerAtMap.y });
  const playerTilePos = mapToWorld(playerAtMap);

  const tileUnder = getTileAt({ x: playerAtMap.x, y: playerAtMap.y + 1 })
  const phase = player.getAnimationPhase(playerTile, OBSTACLE.includes(tileUnder));

  if (action !== RunnerAction.Fall) {
    if (checkFall({ x: player.x, y: player.y })) {
      player.setAction(RunnerAction.Fall);
      return { position: { x, y }, phase: AnimationPhase.Fall, isEnd: false };
    };
  }

  if (action !== RunnerAction.Stay) {
    if (action === RunnerAction.Fall) {
      if (playerTile === Tile.Rope) {
        y = playerTilePos.y;
        player.resetAction();
      }
      if (tile === Tile.Stair) {
        y = playerTilePos.y;
        player.resetAction();
      }
    }

    if (action === RunnerAction.MoveUp) {
      if (playerTile === Tile.Stair
        && ([Tile.Stair, Tile.Rope, Tile.Empty, Tile.Bonus].includes(tile))
      ) {
        x = playerTilePos.x;
      } else {
        y = playerTilePos.y;
      }
    }

    if (action === RunnerAction.MoveDown) {
      if (playerTile === Tile.Empty
        || playerTile === Tile.Stair) {
        x = playerTilePos.x;
      }
    }

    if (OBSTACLE.includes(tile)) {
      // туда нельзя, ровнять координаты по движению
      isEnd = true;
      switch (action) {
        case RunnerAction.MoveLeft:
        case RunnerAction.MoveRight:
          x = playerTilePos.x;
          y = player.y;
          break;
        case RunnerAction.MoveUp:
        case RunnerAction.MoveDown:
        case RunnerAction.Fall:
          x = player.x;
          y = playerTilePos.y;
          if (action === RunnerAction.Fall) {
            player.resetAction();
          }
          break;
      }
    }

    let tile1: Tile;
    let tile2: Tile;
    switch (action) {
      case RunnerAction.MoveLeft:
      case RunnerAction.MoveRight:
        tile1 = getTileAt(worldToMap({ x: x + TileSize / 2, y }));
        tile2 = getTileAt(worldToMap({ x: x + TileSize / 2, y: y + TileSize }));
        if (OBSTACLE.includes(tile1) || OBSTACLE.includes(tile2)) {
          y = playerTilePos.y;
        }
        break;
      case RunnerAction.MoveDown:
      case RunnerAction.MoveUp:
      case RunnerAction.Fall:
        tile1 = getTileAt(worldToMap({ x, y: y + TileSize / 2 }));
        tile2 = getTileAt(worldToMap({ x: x + TileSize, y: y + TileSize / 2 }));
        if (OBSTACLE.includes(tile1) || OBSTACLE.includes(tile2)) {
          x = playerTilePos.x;
        }
        break;
      default:
    }
  }

  return { position: { x, y }, phase, isEnd };
}
