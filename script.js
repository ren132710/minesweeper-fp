import {
  TILE_STATUSES,
  createBoard,
  isPositionMatch,
  markTile,
  revealTile,
  hasPlayerWon,
  hasPlayerLost,
  markedTilesCount,
} from './minesweeper.js'

const body = document.querySelector('body')
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')
const radioButtons = document.querySelectorAll('input[name="game-level"]')
const radioBeginner = document.getElementById('beg')

const TEST_BOARD_SIZE = 3
const TEST_NUMBER_OF_MINES = 2
const TEST_MINE_POSITIONS = [
  { x: 0, y: 0 },
  { x: 2, y: 2 },
]

let board
let numberOfMines

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  //radioBeginner.checked = true | false
  // const [boardSize, numberOfMines] = radioBeginner.value.split('-')
  // boardElement.style.setProperty('--size', boardSize)
  boardElement.style.setProperty('--size', TEST_BOARD_SIZE)
  board = createBoard(TEST_BOARD_SIZE, TEST_MINE_POSITIONS)
  numberOfMines = TEST_NUMBER_OF_MINES

  console.log(board)
  renderBoard()
}

for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', (e) => {
    //reset board
    console.log(body)
    console.log(e.target.id)
    boardElement.removeEventListener('click', stopProp, { capture: true })
    boardElement.removeEventListener('contextmenu', stopProp, { capture: true })
    const [boardSize, mineCount] = e.target.value.split('-')
    numberOfMines = mineCount
    if (e.target.id == 'int') body.style.fontSize = '2rem'
    if (e.target.id === 'adv') body.style.fontSize = '1.25rem'
    board = createBoard(boardSize, getMinePositions(boardSize))
    boardElement.style.setProperty('--size', boardSize)

    renderBoard()
  })
}

boardElement.addEventListener('click', (e) => {
  if (!e.target.matches('[data-status')) return

  board = revealTile(board, {
    x: parseInt(e.target.dataset.x),
    y: parseInt(e.target.dataset.y),
  })

  renderBoard()
})

boardElement.addEventListener('contextmenu', (e) => {
  if (!e.target.matches('[data-status')) return
  e.preventDefault()

  board = markTile(board, {
    x: parseInt(e.target.dataset.x),
    y: parseInt(e.target.dataset.y),
  })

  renderBoard()
})

function renderBoard() {
  isGameOver()
  boardElement.innerHTML = ''

  getTileElements().forEach((element) => {
    boardElement.append(element)
  })

  listMinesLeft()
}

function listMinesLeft() {
  minesLeftText.textContent = numberOfMines - markedTilesCount(board)
}

function isGameOver() {
  const win = hasPlayerWon(board)
  const lose = hasPlayerLost(board)

  if (win || lose) {
    boardElement.addEventListener('click', stopProp, { capture: true })
    boardElement.addEventListener('contextmenu', stopProp, { capture: true })
  }

  if (win) {
    messageText.textContent = 'You Win'
  }
  if (lose) {
    messageText.textContent = 'You Lose'
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) board = markTile(board, tile)
        if (tile.mine) board = revealTile(board, tile)
      })
    })
  }
}

function getTileElements() {
  return board
    .map((row) => {
      return row.map((tile) => {
        return tileToElement(tile)
      })
    })
    .flat()
}

function tileToElement(tile) {
  const element = document.createElement('div')
  element.dataset.status = tile.status
  element.dataset.x = tile.x
  element.dataset.y = tile.y
  element.textContent = tile.adjacentMinesCount || ''
  return element
}

function getMinePositions(boardSize) {
  const minePositions = []

  while (minePositions.length < numberOfMines) {
    const minePosition = {
      x: randomNum(boardSize),
      y: randomNum(boardSize),
    }

    if (!minePositions.some((p) => isPositionMatch(p, minePosition))) {
      minePositions.push(minePosition)
    }
  }
  return minePositions
}

function randomNum(size) {
  return Math.floor(Math.random() * size)
}

function stopProp(e) {
  e.stopImmediatePropagation()
}
