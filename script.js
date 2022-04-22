import {
  TILE_STATUSES,
  createBoard,
  isPositionMatch,
  markTile,
  revealTile,
  hasPlayerWon,
  hasPlayerLost,
} from './minesweeper.js'

const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')
const radioButtons = document.querySelectorAll('input[name="game-level"]')
const radioBeginner = document.getElementById('beg')

const TEST_BOARD_SIZE = 3
const TEST_MINE_POSITIONS = [{ x: 0, y: 0 }]
// const TEST_MINE_POSITIONS = null
const TEST_NUMBER_OF_MINES = 1

let board
let numberOfMines

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
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
    boardElement.removeEventListener('click', stopProp, { capture: true })
    boardElement.removeEventListener('contextmenu', stopProp, { capture: true })
    const [boardSize, mineCount] = e.target.value.split('-')
    numberOfMines = mineCount

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

  console.log(board)
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
  boardElement.innerHTML = ''
  isGameOver()

  getTileElements().forEach((element) => {
    boardElement.append(element)
  })

  listMinesLeft()
}

function isGameOver() {
  // const win = hasPlayerWon(board)
  const lose = hasPlayerLost(board)

  // if (win || lose) {
  if (lose) {
    boardElement.addEventListener('click', stopProp, { capture: true })
    boardElement.addEventListener('contextmenu', stopProp, { capture: true })
  }

  // if (win) {
  //   messageText.textContent = 'You Win'
  // }
  if (lose) {
    messageText.textContent = 'You Lose'
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
        if (tile.mine) revealTile(board, tile)
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

function listMinesLeft() {
  minesLeftText.textContent = numberOfMines
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
