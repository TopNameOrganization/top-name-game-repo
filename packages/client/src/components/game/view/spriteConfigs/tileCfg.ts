import { Tile } from '../../constants'
import tileImg from '../../../../assets/game/tiles.png';

const img = new Image();
img.src = tileImg;

export const tileCfg = {
  img,
  fps: 15,
  phases: {
    [Tile.Brick]: { start: 0, length: 1 },
    [Tile.Concrete]: { start: 1, length: 1 },
    [Tile.Stair]: { start: 2, length: 1 },
    [Tile.Rope]: { start: 3, length: 1 },
    [Tile.Bonus]: { start: 4, length: 1 },
  },
}
