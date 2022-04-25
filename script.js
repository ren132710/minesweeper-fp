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

let board
let numberOfMines

const body = document.querySelector('body')
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')
const radioButtons = document.querySelectorAll('input[name="game-level"]')
const radioBeginner = document.getElementById('beg')

//if not in production, load test board
if (process.env.NODE_ENV !== 'production' && window.testBoard) {
  board = window.testBoard

  const boardSize = board.length
  numberOfMines = board.flat().filter((tile) => tile.mine).length
  boardElement.style.setProperty('--size', boardSize)

  renderBoard()
}

for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', (e) => {
    //reset board
    boardElement.removeEventListener('click', stopProp, { capture: true })
    boardElement.removeEventListener('contextmenu', stopProp, { capture: true })

    if (e.target.id == 'int') body.style.fontSize = '2rem'
    if (e.target.id === 'adv') body.style.fontSize = '1.25rem'

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
