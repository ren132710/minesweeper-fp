import { times, range } from 'lodash/fp'

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

export function revealTile(board, { x, y }) {
  const tile = board[x][y]

  if (tile.status !== TILE_STATUSES.HIDDEN) return board

  if (tile.mine) {
    return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUSES.MINE })
  }

  const adjacentTiles = nearbyTiles(board, tile)
  const adjacentMines = adjacentTiles.filter((tile) => tile.mine === true)

  const newBoard = replaceTile(
    board,
    { x, y },
    { ...tile, status: TILE_STATUSES.NUMBER, adjacentMinesCount: adjacentMines.length }
  )

  if (adjacentMines.length === 0) {
    return adjacentTiles.reduce((board, tile) => {
      return revealTile(board, tile)
    }, newBoard)
  }

  return newBoard
}

function nearbyTiles(board, { x, y }) {
  //iterate over -1, 0, 1
  const offsets = range(-1, 2)

  return offsets
    .map((xOffset) => {
      return offsets.map((yOffset) => {
        return board[x + xOffset]?.[y + yOffset]
      })
    })
    .flat()
    .filter((tile) => tile != null)
}

export function markTile(board, { x, y }) {
  //TODO: Is it fp overkill to clone the board?
  const newBoard = [...board]
  const tile = newBoard[x][y]

  if (tile.status === TILE_STATUSES.NUMBER) return newBoard
  if (tile.status === TILE_STATUSES.MINE) return newBoard

  if (tile.status === TILE_STATUSES.HIDDEN) {
    return replaceTile(newBoard, { x, y }, { ...tile, status: TILE_STATUSES.MARKED })
  }

  if (tile.status === TILE_STATUSES.MARKED) {
    return replaceTile(newBoard, { x, y }, { ...tile, status: TILE_STATUSES.HIDDEN })
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

export function hasPlayerWon(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED))
      )
    })
  })
}

export function hasPlayerLost(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUSES.MINE
    })
  })
}

export function markedTilesCount(board) {
  let count = 0
  board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.status === TILE_STATUSES.MARKED) {
        count = count + 1
      }
    })
  })
  return count
}
