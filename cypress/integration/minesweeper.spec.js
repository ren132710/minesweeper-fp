import { TILE_STATUSES } from '../../minesweeper.js'

describe('user left clicks on a tile', () => {
  describe('if the tile is not a mine and is adjacent to mine(s)', () => {
    it('should display number of adjacent mines and set tile status to number', () => {
      cy.visit('/', {
        onBeforeLoad(window) {
          window.testBoard = [
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
              { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: true },
            ],
          ]
        },
      })

      cy.get('[data-x="1"][data-y="1"]').click()
      cy.get('[data-x="1"][data-y="1"]').should('have.text', '2')
      cy.get('[data-x="1"][data-y="1"]').should('have.attr', 'data-status', TILE_STATUSES.NUMBER)
    })
  })

  describe('if the tile is not a mine and is not adjacent to mine(s)', () => {
    it('should display nothing and set tile status to number', () => {
      cy.visit('/', {
        onBeforeLoad(window) {
          window.testBoard = [
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
              { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: true },
            ],
          ]
        },
      })

      cy.get('[data-x="0"][data-y="2"]').click()
      cy.get('[data-x="0"][data-y="2"]').should('have.text', '')
      cy.get('[data-x="0"][data-y="2"]').should('have.attr', 'data-status', TILE_STATUSES.NUMBER)
    })
  })

  describe('if the tile is a mine', () => {
    it('should reveal itself and all other mines and end game', () => {
      //use defined custom command visitBoard()
      cy.visitBoard([
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
          { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
      ])

      //click mine
      cy.get('[data-x="0"][data-y="0"]').click()
      cy.get('[data-x="0"][data-y="0"]').should('have.attr', 'data-status', TILE_STATUSES.MINE)
      //reveal other mines
      cy.get('[data-x="2"][data-y="2"]').should('have.attr', 'data-status', TILE_STATUSES.MINE)
      //end game
      cy.get('.subtext').should('have.text', 'You Lose')
      //disable input
      cy.get('[data-x="1"][data-y="1"]').click()
      cy.get('[data-x="1"][data-y="1"]').should('have.attr', 'data-status', TILE_STATUSES.HIDDEN)
    })
  })
})

describe('user right clicks on a tile', () => {
  describe('if the tile is not marked', () => {
    it('should mark the tile', () => {
      cy.visitBoard([
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
          { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
      ])

      cy.get('[data-x="1"][data-y="1"]').rightclick()
      cy.get('[data-x="1"][data-y="1"]').should('have.attr', 'data-status', TILE_STATUSES.MARKED)
    })
  })

  describe('if the tile is marked', () => {
    it('should un-mark the tile', () => {
      cy.visitBoard([
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 0, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.MARKED, mine: false },
          { x: 1, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
        [
          { x: 2, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 2, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: true },
        ],
      ])

      cy.get('[data-x="1"][data-y="1"]').rightclick()
      cy.get('[data-x="1"][data-y="1"]').should('have.attr', 'data-status', TILE_STATUSES.HIDDEN)
    })
  })
})

describe('user wins game', () => {
  it('should win game when only remaining tiles are mines tiles that are either marked or hidden', () => {
    cy.visitBoard([
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
        { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
    ])

    //play winning game
    cy.get('[data-x="0"][data-y="0"]').rightclick()
    cy.get('[data-x="0"][data-y="1"]').click()
    cy.get('[data-x="0"][data-y="2"]').click()
    cy.get('[data-x="1"][data-y="0"]').click()
    cy.get('[data-x="1"][data-y="1"]').click()
    cy.get('[data-x="1"][data-y="2"]').click()
    cy.get('[data-x="2"][data-y="0"]').click()
    cy.get('[data-x="2"][data-y="1"]').click()
    //end game
    cy.get('.subtext').should('have.text', 'You Win')
    //disable input
    cy.get('[data-x="1"][data-y="1"]').rightclick()
    cy.get('[data-x="1"][data-y="1"]').should('have.attr', 'data-status', TILE_STATUSES.NUMBER)
  })
})
