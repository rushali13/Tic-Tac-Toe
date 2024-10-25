import {useState} from "react";
import Player from "./components/player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  "X": "Player 1",
  "O": "Player 2"
};

function deriveActivePlayer(gameTurns){
    let activePlayer = "X";
    if(gameTurns.length > 0 && gameTurns[0].player === "X"){
      activePlayer = "O";
    }
    return activePlayer;
}

function deriveWinner(gameBoard, player){
    let winner;
    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = player[firstSquareSymbol];
      }
    }
    return winner;
}

function deriveGameBoard(gameTurns){
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
    for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
    }
    return gameBoard;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState(PLAYERS)
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, player);
  const isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSqaure(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleReset(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayer(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || isDraw)  && <GameOver winner={winner} onReset={handleReset}/>}
        <GameBoard board={gameBoard} onSelectSquare={handleSelectSqaure}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
