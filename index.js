var origGame;
 const personPlayer = 'O';
 const machinePlayer = 'X';
 const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1.4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2],
 ]
 const cells = document.querySelectorAll('.cell');
 startGame();

 function startGame() {
  document.querySelector('.gameover').style.display ='none';
 origGame = Array.from(Array(9).keys())
 for(let i = 0 ; i <cells.length; i++){
  cells[i].innerText = '';
  cells[i].style.removeProperty('background-color');
  cells[i].addEventListener('click',turnClick,false);

   }
 }
 function turnClick(square){
 turn(square.target.id,personPlayer)
 }
 function turn(squareId,player){
  origGame[squareId]= player;
  document.getElementById(squareId
   ).innerText= player;
 let gameWon = checkWin(origGame,player)
   if(gameWon)gameOver(gameWon)
  }

 function checkWin(board,player){ 
  let plays = board.reduce ((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index,win] of winCombos.entries()){
   if (win.every(elem => plays.indexOf(elem) > -1)){
    gameWon = {index:index,player:player}
    break;
   }

  }
  return gameWon;
 }
 function gameOver(gameWon){
  for(let index of winCombos[gameWon.index]) {
   document.getElementById(index).style.backgroundColor = gameWon.player == personPlayer ? 'blue' : 'red';
  }
  for (let i = 0; i < cells.length; i++){
   cells[i].removeEventListener('click',turnClick.false)
  }
  declareWinner(gameWon.player == personPlayer ?'You win!': 'You lose')
 }
 function declareWinner(who){
  document.querySelector('..gameOver').style.display ='block';
  document.querySelector('.gameOver.text').innerText=  who;

 }
 function emptySquares(){
  return origGame.filter(s=> s== 'number')

 }
 function bestSpot(){
  return emptySquares()[0]
 }
 function checkTie(){
  if(emptySquares().length == 0){
   for(let i = 0; i <cells.length; i++){
    cells[i].style.backgroundColor = 'green';
    cells[i].removeEventListener('click, turnClick',false)
   }
   declareWinner('Tie Game')
   return true
  }
  return false;
 }
 function minimax(newBoard,player){
  let availSpot = emptySquares()
  if(checkWin(newBoard.personPlayer)){
   return {score:-10};

  }else if (checkWin(newBoard,machinePlayer)){
   return{score:10};

  }else if (availSpot.length === 0){
   return{score:0}
  }
  let moves =[];
  for(let i = 0; i< availSpot.length;i++){
   let move ={}
   move.index = newBoard[availSpot[i]];
   newBoard[availSpot[i]] = player
   if(player == machinePlayer){
    let result = minimax(newBoard,personPlayer)
    move.score = result.score
   }else{
    let result = minimax(newBoard,machinePlayer)
    move.score = result.score
   }
   newBoard[availSpot[i]] = move.index;
   move.push(move)
    }
    let bestMove ;
    if(player === machinePlayer){
     let bestScore = -10000;
     for(let i =0; i <move.length ;i++){
      if (moves[i].score >bestScore){
       bestSpot = moves[i].score;
       bestMove =i;

      }

     }
    }else{
     let bestScore = 10000;
     for(let i= 0;i <moves.length; i++){
      if(moves[i].score <bestScore){
       bestScore = moves[i].score;
       bestMove = i;
      }
     }
    }
    return moves[bestMove]







    }

   

 