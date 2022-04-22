import { TILE_STATUSES, createBoard, isPositionMatch } from './minesweeper.js'

const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')
const radioButtons = document.querySelectorAll('input[name="game-level"]')
const radioBeginner = document.getElementById('beg')

const TEST_BOARD_SIZE = 3
const TEST_MINE_POSITIONS = [{ x: 1, y: 1 }]
const TEST_NUMBER_OF_MINES = 1

let board
let numberOfMines

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  //   const [boardSize, numberOfMines] = radioBeginner.value.split('-')
  //   boardElement.style.setProperty('--size', boardSize)
  boardElement.style.setProperty('--size', TEST_BOARD_SIZE)
  board = createBoard(TEST_BOARD_SIZE, TEST_MINE_POSITIONS)
  numberOfMines = TEST_NUMBER_OF_MINES
  renderBoard()
}

for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', (e) => {
    const [boardSize, mineCount] = e.target.value.split('-')
    board = createBoard(boardSize, getMinePositions(boardSize))
    numberOfMines = mineCount
    boardElement.style.setProperty('--size', boardSize)
    console.log(board)
    renderBoard()
  })
}

function renderBoard() {
  boardElement.innerHTML = ''

  getTileElements().forEach((element) => {
    boardElement.append(element)
  })

  listMinesLeft()
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
