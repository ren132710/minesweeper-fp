import {
  TILE_STATUSES,
  createBoard,
  isPositionMatch,
  markTile,
  revealTile,
  hasPlayerWon,
  hasPlayerLost,
} from './minesweeper'

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

describe('#markTile', () => {
  test('if tile status is hidden, should set tile status to marked', () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ]

    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ]
    expect(markTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
  })

  test('if tile status is marked, should set tile status to hidden ', () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ]

    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ]
    expect(markTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
  })

  test('if tile status is number, should do nothing', () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ]

    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ]
    expect(markTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
  })

  test('if tile status is mine, should do nothing', () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ]

    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ]
    expect(markTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
  })
})

describe('#revealTile', () => {
  describe('if tile is hidden', () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ]
    describe('if tile is a mine', () => {
      test('should set tile status to mine and end game (lost)', () => {
        const expectedBoard = [
          [
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 0, y: 1, status: TILE_STATUSES.MINE, mine: true },
          ],
          [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
        ]
        expect(revealTile(board, { x: 0, y: 1 })).toEqual(expectedBoard)
        expect(hasPlayerLost(expectedBoard)).toBeTruthy()
      })
    })

    describe('if tile is not a mine', () => {
      test('if tile is adjacent to a mine, should count the number of nearby mines and set tile status to number', () => {
        const expectedBoard = [
          [
            { x: 0, y: 0, status: TILE_STATUSES.NUMBER, mine: false, adjacentMinesCount: 1 },
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
          ],
          [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
        ]
        expect(revealTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
      })
      test('if tile is not adjacent to a mine, should reveal nearby tiles and set tile status to number', () => {
        const board = [
          [
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 0, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
          [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
          [
            { x: 2, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 2, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
        ]

        const expectedBoard = [
          [
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
            {
              x: 0,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1,
            },
            {
              x: 0,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
          ],
          [
            {
              x: 1,
              y: 0,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1,
            },
            {
              x: 1,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1,
            },
            {
              x: 1,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
          ],
          [
            {
              x: 2,
              y: 0,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
            {
              x: 2,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
            {
              x: 2,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
          ],
        ]
        expect(revealTile(board, { x: 2, y: 2 })).toEqual(expectedBoard)
      })
    })
  })

  describe('if tile is not hidden', () => {
    test('if tile status is marked, should do nothing', () => {
      const board = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ]

      const expectedBoard = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ]
      expect(revealTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
    })
    test('if tile status is number, should do nothing', () => {
      const board = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ]

      const expectedBoard = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ]
      expect(revealTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
    })
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

describe('#hasPlayerLost', () => {
  test('should return true when any tile status is mine', () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false },
      ],
    ]
    expect(hasPlayerLost(board)).toBeTruthy()
  })

  test('should return false if no tile status is mine', () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false },
      ],
    ]
    expect(hasPlayerLost(board)).toBeFalsy()
  })
})
