import { AnimationPhase } from '../../constants'
import enemyImg from '../../../../assets/game/enemy.png';

const img = new Image();
img.src = enemyImg;

export const enemyCfg = {
  img,
  fps: 16,
  phases: {
    [AnimationPhase.Run]: { start: 0, length: 4 },
    [AnimationPhase.Climb]: { start: 4, length: 4 },
    [AnimationPhase.Hang]: { start: 8, length: 4 },
    [AnimationPhase.Fall]: { start: 12, length: 4 },
    [AnimationPhase.Stay]: { start: 16, length: 1 },
  },
}
