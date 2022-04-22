import { times } from 'lodash/fp'

export const TILE_STATUSES = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
}

export function createBoard(boardSize, minePositions) {
  return times((x) => {
    return times((y) => {
      return {
        x,
        y,
        status: TILE_STATUSES.HIDDEN,
        // mine: minePositions.some(positionMatch.bind(null, { x, y })),
        mine: minePositions.some((p) => isPositionMatch(p, { x, y })),
      }
    }, boardSize)
  }, boardSize)
}

export function isPositionMatch(a, b) {
  return a.x === b.x && a.y === b.y
}
