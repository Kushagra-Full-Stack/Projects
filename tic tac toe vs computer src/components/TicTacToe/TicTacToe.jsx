import React, { useRef, useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

const TicTacToe = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const boxRefs = useRef([]);
  for (let i = 0; i < 9; i++) {
    boxRefs.current[i] = React.createRef();
  }

  // Effect hook to trigger computer's move when it's not the player's turn
  useEffect(() => {
    if (!isPlayerTurn && !lock) {
      setTimeout(computerMove, 500); // Add a delay for better user experience
    }
  }, [isPlayerTurn, lock]);

  const playerMove = (index) => {
    if (data[index] === "" && !lock) {
      const newData = [...data];
      newData[index] = "x";
      boxRefs.current[index].current.innerHTML = `<img src='${cross_icon}' alt="X">`;
      setData(newData);
      checkWin(newData, "x");
    }
  };

  const computerMove = () => {
    let emptyIndexes = [];
    data.forEach((value, index) => {
      if (value === "") emptyIndexes.push(index);
    });

    if (emptyIndexes.length > 0) {
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const newData = [...data];
      newData[randomIndex] = "o";
      boxRefs.current[randomIndex].current.innerHTML = `<img src='${circle_icon}' alt="O">`;
      setData(newData);
      setIsPlayerTurn(true);
      checkWin(newData, "o");
    }
  };

  const checkWin = (newData, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        declareWinner(player);
        return;
      }
    }

    if (!newData.includes("")) {
      declareDraw();
    }
  };

  const declareWinner = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src=${winner === "x" ? cross_icon : circle_icon} alt="${winner.toUpperCase()}"> Wins!`;
  };

  const declareDraw = () => {
    setLock(true);
    titleRef.current.textContent = "It's a Draw!";
  };

  const reset = () => {
    setLock(false);
    setIsPlayerTurn(true);
    setData(["", "", "", "", "", "", "", "", ""]);
    titleRef.current.innerHTML = `Tic Tac Toe in <span>React</span>`;
    boxRefs.current.forEach(ref => ref.current.innerHTML = "");
  };

  const handleClick = (index) => {
    if (isPlayerTurn && !lock) {
      playerMove(index);
      setIsPlayerTurn(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
      <div className="board">
        {data.map((value, index) => (
          <div
            key={index}
            className="boxes"
            ref={boxRefs.current[index]}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
      <button className='reset' onClick={reset}> Reset </button>
    </div>
  );
};

export default TicTacToe;
