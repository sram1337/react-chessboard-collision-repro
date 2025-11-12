import { useRef, useState } from 'react'
import { Chess } from 'chess.js'
import './App.css'
import { Chessboard } from 'react-chessboard'
import type { ChessboardOptions, PieceDropHandlerArgs } from 'react-chessboard'

function App() {
  const chessGameRef = useRef(new Chess())
  const chessGame = chessGameRef.current
  const [chessPosition, setChessPosition] = useState(chessGame.fen())

  function makeRandomMove() {
    const possibleMoves = chessGame.moves()
    if (chessGame.isGameOver() || possibleMoves.length === 0) {
      return
    }

    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    chessGame.move(randomMove)
    setChessPosition(chessGame.fen())
  }

  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    if (!targetSquare) {
      return false
    }

    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      })

      setChessPosition(chessGame.fen())
      setTimeout(makeRandomMove, 500)
      return true
    } catch {
      return false
    }
  }

  const chessboardOptions: ChessboardOptions = {
    id: 'play-vs-random',
    position: chessPosition,
    onPieceDrop,
    boardStyle: {
      width: '100%',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  }

  return (
    <div className="app">
      <Chessboard options={chessboardOptions} />
    </div>
  )
}

export default App
