document.addEventListener('DOMContentLoaded' , () => {
const grid = document.querySelector('.grid')
const width = 8
const scoreDisplay = document.getElementById('score')
const squares = []
let score = 0

const candyColors = [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
]

// Create Board
function createBoard() {
    for (let i=0; i < width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id',i)
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundImage = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}

createBoard()

//Drag Boxes

let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart() {
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragstart')
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragover')
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragenter')
}

function dragLeave() {
    console.log(this.id, 'dragleave')
}

function dragEnd() {
    console.log(this.id, 'dragend')
    // Valid Move?
    let validMoves = [
        squareIdBeingDragged -1,
        squareIdBeingDragged -width,
        squareIdBeingDragged +1,
        squareIdBeingDragged +width,
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}

function dragDrop() {
    console.log(this.id, 'dragdrop')
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt (this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

//Fill Blank after Match
function moveDown() {
    for (i=0; i<55; i++) {
        if(squares[i+width].style.backgroundImage === '') {
            squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundImage === '') {
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor]
            }
        }
    }
}

// Check For match
// Check row of 4
function checkRowForFour() {
    for (i=0; i < 60; i++ ) {
        let rowOfFour = [i, i+1 , i+2 , i+3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [5, 6, 7, 13 , 14, 15 , 21 , 22, 23, 29 ,30, 31, 37 ,38, 39,45,46,47, 53 ,54, 55]
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach (index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkRowForFour()

// Check Column of 4
function checkColumnForFour() {
    for (i=0; i < 39; i++ ) {
        let ColumnOfFour = [i, i+width , i+width*2 , i+width*3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (ColumnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            ColumnOfFour.forEach (index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkColumnForFour()

// Check row of 3
function checkRowForThree() {
    for (i=0; i < 61; i++ ) {
        let rowOfThree = [i, i+1 , i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [6, 7, 14, 15 , 22, 23, 30, 31, 38,39,46,47, 54, 55]
        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach (index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkRowForThree()

// Check Column of 3
function checkColumnForThree() {
    for (i=0; i < 47; i++ ) {
        let ColumnOfThree = [i, i+width , i+width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (ColumnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            ColumnOfThree.forEach (index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkColumnForThree()

window.setInterval(function() {
    moveDown()
    checkRowForThree()
    checkColumnForThree()
    checkRowForFour()
    checkColumnForFour()
}, 100)






})