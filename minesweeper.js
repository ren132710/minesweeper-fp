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

export function markTile(board, { x, y }) {
  const tile = board[x][y]

  if (tile.status === TILE_STATUSES.NUMBER) return board
  if (tile.status === TILE_STATUSES.MINE) return board

  if (tile.status === TILE_STATUSES.HIDDEN) {
    return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUSES.MARKED })
  }

  if (tile.status === TILE_STATUSES.MARKED) {
    return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUSES.HIDDEN })
  }
}

export function revealTile(board, { x, y }) {
  const tile = board[x][y]

  if (tile.mine) {
    return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUSES.MINE })
  }
}

function replaceTile(board, position, newTile) {
  return board.map((row, x) => {
    return row.map((tile, y) => {
      if (isPositionMatch(position, { x, y })) {
        return newTile
      }
      return tile
    })
  })
}

export function isPositionMatch(a, b) {
  return a.x === b.x && a.y === b.y
}

// export function hasPlayerWon(board) {
//   return board.every((row) => {
//     return row.every((tile) => {
//       return (
//         tile.status === TILE_STATUSES.NUMBER ||
//         (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED))
//       )
//     })
//   })
// }

export function hasPlayerLost(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUSES.MINE
    })
  })
}
