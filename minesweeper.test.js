import { TILE_STATUSES, createBoard, isPositionMatch } from './minesweeper'

describe('#createBoard', () => {
  test('should create a valid board', () => {
    const boardSize = 3
    // const minePositions = [{ x: 1, y: 1 }]
    // const expectedBoard = [
    //   [
    //     { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
    //     { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
    //     { x: 0, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
    //   ],
    //   [
    //     { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
    //     { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
    //     { x: 1, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
    //   ],
    //   [
    //     { x: 2, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
    //     { x: 2, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
    //     { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
    //   ],
    // ]
    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN },
        { x: 0, y: 2, status: TILE_STATUSES.HIDDEN },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN },
        { x: 1, y: 2, status: TILE_STATUSES.HIDDEN },
      ],
      [
        { x: 2, y: 0, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 1, status: TILE_STATUSES.HIDDEN },
        { x: 2, y: 2, status: TILE_STATUSES.HIDDEN },
      ],
    ]

    const board = createBoard(boardSize)
    expect(board).toEqual(expectedBoard)
  })
})
