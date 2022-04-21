import { TILE_STATUSES, createBoard, isPositionMatch } from './minesweeper.js'

const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')
const radioButtons = document.querySelectorAll('input[name="game-level"]')
const radioBeginner = document.getElementById('beg')

const TEST_BOARD_SIZE = 3
// const TEST_MINE_POSITIONS = [{ x: 1, y: 1 }]

let board

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  //   const [boardSize, numberOfMines] = radioBeginner.value.split('-')
  //   boardElement.style.setProperty('--size', boardSize)
  boardElement.style.setProperty('--size', TEST_BOARD_SIZE)
  board = createBoard(TEST_BOARD_SIZE)
  console.log(board)
  renderBoard()
}

for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', (e) => {
    const [boardSize, numberOfMines] = e.target.value.split('-')
    board = createBoard(boardSize)
    boardElement.style.setProperty('--size', boardSize)
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
  minesLeftText.textContent = 'TODO'
}
