import { TILE_STATUSES, createBoard, isPositionMatch } from './minesweeper'

describe('#createBoard', () => {
  test('should create a valid board', () => {
    const boardSize = 3
    const minePositions = [{ x: 1, y: 1 }]
    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        { x: 1, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 2, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 2, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ]
    const board = createBoard(boardSize, minePositions)
    expect(board).toEqual(expectedBoard)
  })
})

describe('#isPositionMatch', () => {
  test('should return true when the x and y properties of tile and mine are the same', () => {
    const posTile = { x: 1, y: 2 }
    const posMine = { x: 1, y: 2 }
    expect(isPositionMatch(posMine, posTile)).toBeTruthy()
  })

  test('should return false when the x and y properties of tile and mine are different', () => {
    const posTile = { x: 1, y: 2 }
    const posMine = { x: 1, y: 1 }
    expect(isPositionMatch(posMine, posTile)).toBeFalsy()
  })
})
