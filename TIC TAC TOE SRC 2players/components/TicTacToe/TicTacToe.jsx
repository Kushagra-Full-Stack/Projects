import React, { useRef, useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../assets/circle.png'
import cross_icon from '../assets/cross.png'

let data = ["","","","","","","","",""]; // Initializing the game board data

const TicTacToe = () => {
  // State to keep track of the number of moves and lock the game board when there's a winner
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null); // Reference for the title element

  // References for each of the nine boxes
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);
 
  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  // Function to handle the click on each box
  const toggle = (w, num) => {
    if (lock) {
      return; // Prevent further moves if the game is locked
    }
    if (data[num] !== "") {
      return; // Prevent clicking on an already filled box
    }

    if (count % 2 === 0) {
      w.target.innerHTML = `<img src='${cross_icon}' alt='X'>`; // Place X icon
      data[num] = "x"; // Update the game board data
    } else {
      w.target.innerHTML = `<img src='${circle_icon}' alt='O'>`; // Place O icon
      data[num] = "o"; // Update the game board data
    }
    setCount(count + 1); // Increment the move counter
    checkWin(); // Check if there's a winner after each move
  }

  // Function to check for a winning condition
  const checkWin = () => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] === data[b] && data[b] === data[c] && data[a] !== "") {
        won(data[a]); // Call the won function if there's a match
        return;
      }
    }

    if (count === 8) {
      titleRef.current.innerHTML = "It's a Draw!";
      setLock(true);
    }
  }

  // Function to handle the winning scenario
  const won = (winner) => {
    setLock(true); // Lock the game board to prevent further moves
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon} alt='X'> Player X Wins!`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon} alt='O'> Player O Wins!`;
    }
  }

  // Function to reset the game board
  const reset = () => {
    setLock(false);
    data = ["","","","","","","","",""]; // Reset the game data
    setCount(0); // Reset the move counter
    titleRef.current.innerHTML = `Tic Tac Toe in <span>React</span>`;
    box_array.forEach((box) => {
      box.current.innerHTML = ""; // Clear each box
    });
  }

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
      <div className="board">
        <div className="row">
          <div className="boxes" ref={box1} onClick={(w) => toggle(w, 0)}></div>
          <div className="boxes" ref={box2} onClick={(w) => toggle(w, 1)}></div>
          <div className="boxes" ref={box3} onClick={(w) => toggle(w, 2)}></div>
        </div>
        <div className="row">
          <div className="boxes" ref={box4} onClick={(w) => toggle(w, 3)}></div>
          <div className="boxes" ref={box5} onClick={(w) => toggle(w, 4)}></div>
          <div className="boxes" ref={box6} onClick={(w) => toggle(w, 5)}></div>
        </div>
        <div className="row">
          <div className="boxes" ref={box7} onClick={(w) => toggle(w, 6)}></div>
          <div className="boxes" ref={box8} onClick={(w) => toggle(w, 7)}></div>
          <div className="boxes" ref={box9} onClick={(w) => toggle(w, 8)}></div>
        </div>
      </div>
      <button className='reset' onClick={reset}> Reset </button>
    </div>
  )
}

export default TicTacToe;
