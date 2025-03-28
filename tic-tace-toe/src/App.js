import { useState } from "react";
export default function Board() {
  const [squareValues, setValues] = useState(Array(9).fill(null))
  const [xIsNext,setXIsNext] = useState(true)
  function handleClick(i){
    if(squareValues[i] ||calculateWinner(squareValues)){
      return;
    }
    const nextSquares = squareValues.slice();
    nextSquares[i] = xIsNext?"X":"O";
    setValues(nextSquares);
    setXIsNext(!xIsNext)
  }
  const winner = calculateWinner(squareValues)
  let status;
  if(winner){
    status = "Winner: " + winner
  }else if(squareValues.includes(null)){
    status = "Next player: " + (xIsNext ? "X" : "O");
  }else{
    status = "Draw"
  }
  return( 
    <>
      <div className="container">
        <div className="status">{status}</div>
        {(status==="Draw"||winner) && (
          <button onClick={()=>{
            setValues(Array(9).fill(null));
            setXIsNext(true);
          }}>Reset Board</button>
        )}
      </div>
     
      <div className="board-row">
        <Square value={squareValues[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squareValues[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squareValues[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squareValues[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squareValues[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squareValues[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squareValues[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squareValues[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squareValues[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </>
  );
 
}

function Square({value, onSquareClick}){
  
  return(
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}