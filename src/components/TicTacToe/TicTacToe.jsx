import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';

const TicTacToe = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (num) => {
    if (board[num] !== "" || lock) return; // Prevent overwriting a cell and game if locked

    const newBoard = [...board];
    if (count % 2 === 0) {
      newBoard[num] = "x";
    } else {
      newBoard[num] = "o";
    }

    setBoard(newBoard);
    setCount(prevCount => prevCount + 1);
    checkWin(newBoard); // Check for a winner after each move
  };

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    if (titleRef.current) titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>"; // Reset title text
  };

  const checkWin = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
        won(newBoard[a]);
        return;
      }
    }

    if (newBoard.every(cell => cell !== "")) {
      // If all cells are filled and no winner
      setLock(true);
      if (titleRef.current) titleRef.current.innerHTML = "It's a draw!";
    }
  };

  const won = (winner) => {
    setLock(true);
    if (titleRef.current) {
      if (winner === "x") {
        titleRef.current.innerHTML = `<img src="${cross_icon}" alt="X"> You Win!`;
      } else {
        titleRef.current.innerHTML = `<img src="${circle_icon}" alt="O"> You Win!`;
      }
    }
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>

      <div className="board">
        <div className="row1">
          {[0, 1, 2].map((num) => (
            <div key={num} className="boxex" onClick={() => toggle(num)}>
              {board[num] === "x" && <img src={cross_icon} alt="X" />}
              {board[num] === "o" && <img src={circle_icon} alt="O" />}
            </div>
          ))}
        </div>

        <div className="row2">
          {[3, 4, 5].map((num) => (
            <div key={num} className="boxex" onClick={() => toggle(num)}>
              {board[num] === "x" && <img src={cross_icon} alt="X" />}
              {board[num] === "o" && <img src={circle_icon} alt="O" />}
            </div>
          ))}
        </div>

        <div className="row3">
          {[6, 7, 8].map((num) => (
            <div key={num} className="boxex" onClick={() => toggle(num)}>
              {board[num] === "x" && <img src={cross_icon} alt="X" />}
              {board[num] === "o" && <img src={circle_icon} alt="O" />}
            </div>
          ))}
        </div>
      </div>
      
      <button className='reset' onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
