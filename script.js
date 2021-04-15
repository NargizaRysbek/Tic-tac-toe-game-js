let area = document.getElementById('area') // поле
let cells = document.getElementsByClassName('cell') // ячейка динамически добавлять
let whoWins = document.getElementById('whoWins') // кто выиграл
let currentPlayer = document.getElementById('currentPl') // сейчас ходит
let roundHistory = [] // история раундов
let player = 'X'
// let ai = 'O'

let stat = {
    'X': 0,
    'O': 0,
    'D': 0
} // статистика шаблона

let winCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
] // выиграшные комбинации

for (let i = 1; i <= 9; i++) {
    area.innerHTML += `<div class="cell" pos="${i}"></div>`
} // div внутри пустой и равна false

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellOnclick, false)
}

function cellOnclick() {
    // console.log('click')
    let data = []
    console.log(this)

    if (!this.innerHTML) { // если здесь будет false, проверка// если там пусто,  
        this.innerHTML = player // написать X 
    } else {
        alert('ячейка занята')
        return;
    }

    for (let i in cells) {
        if (cells[i].innerHTML == player) {
            data.push(parseInt(cells[i].getAttribute('pos')))
        }
    }
    // 333
    if(checkWinner(data)){
        stat[player] += 1 // если здесь тру, статистиканын озгормосун жанылатабыз
        whoWins.innerHTML = 'Победа ' + [player]
        roundHistory.push(whoWins.innerHTML)
        refresh()
    }else{  // алгоритм ничья
        let draw = true
        for(let i in cells){
            if(cells[i].innerHTML == '') draw = false
        }

        if(draw){
            stat.D += 1
            refresh()
            whoWins.innerHTML = 'Ничья '
            roundHistory.push(whoWins.innerHTML)
        }
    }
    player = player === "X" ? "O" : "X"
    currentPlayer.innerHTML = player.toLocaleUpperCase()

}
// let data = [X, ]
function checkWinner(data) {
    for (let i in winCombination) {
        let win = true;
        for (let j in winCombination[i]) { //1 массив, j = 8 массив // 0.1,0.2,0.3,1.0,1.1,1.2,2.0..
            let id = winCombination[i][j];
            let ind = data.indexOf(id)

            if (ind == -1) {
                win = false
            }
        }

        if (win) return true
    }
    return false
}

function refresh(){
  for(let i = 0; i< cells.length; i++){
   cells[i].innerHTML = ''
  }
  updateStat()
  updateroundHistory()
}
function updateStat(){
document.getElementById('sX').innerHTML = stat.X
document.getElementById('sO').innerHTML = stat.O
document.getElementById('sD').innerHTML = stat.D
}

function updateroundHistory(){
document.getElementById('roundHistory').innerHTML = roundHistory
}

// let names = ['Asan', 'Aza', 'Uson']
// names.indexOf('Jaza') // -1 kaitarat

// checkWinner = true - win , false - проиграл