import React, {useRef, useState} from 'react'
import './Tictactoe.css'

import circle from './circle.png'
import cross from './cross.png'

let data = ["","","","","","","","",""]

let winnerPatterns = [
    ["o","o","o","","","","","",""],
    ["","","","o","o","o","","",""],
    ["","","","","","","o","o","o"],
    ["o","","","o","","","o","",""],
    ["","o","","","o","","","o",""],
    ["","","o","","","o","","","o"],
    ["o","","","","o","","","","o"],
    ["","","o","","o","","o","",""]
]

const Tictactoe = () => {

    let [count, setCount] = useState(0)
    let [lock, setLock] = useState(false)
    let [winnerText, setWinnerText] = useState("")

    let box0 = useRef(null)
    let box1 = useRef(null)
    let box2 = useRef(null)
    let box3 = useRef(null)
    let box4 = useRef(null)
    let box5 = useRef(null)
    let box6 = useRef(null)
    let box7 = useRef(null)
    let box8 = useRef(null)

    let boxes = [box0, box1, box2, box3, box4, box5, box6, box7, box8]

    const boardRef = useRef(null)
    const toggle = (e, num) => {

        // check game is already finished
        if(lock) {
            return
        }

        // avoid re-assigning
        if(data[num] !== '') {
            return
        }

        if (count %2 === 0) {
            // prefer not to render entire board when status changed.
            e.target.innerHTML = `<img src='${cross}' alt="">`
            data[num] = 'x'
            setCount(++count)
        }
        else
        {
            e.target.innerHTML = `<img src='${circle}' alt="">`
            data[num] = 'o'
            setCount(++count)
        }

        let winner = checkWin()
        if(count === 9 && winner === 't') {
            showTie()
            setLock(true)
        }else if ( winner !== 't') {
            showWinner(winner)
            setLock(true)
        }
    }

    const showWinner = (winner) => {
       setWinnerText(winner + " won the game!")
    }

    const showTie = () => {
        setWinnerText("It's a Tie!")
    }

    const checkPattern = (pattern) => {
        let xCounter = 0;
        let cCounter = 0;
        for(let i = 0; i < pattern.length; i++) {
            if (pattern[i] === "o") {
                if (data[i] === "o") {
                    cCounter++
                }
                if(data[i] === "x") {
                    xCounter++
                }
            }
        }

        if(xCounter === 3) {
            return "x"
        }
        if(cCounter === 3) {
            return "o"
        }
        return 't'
    }

    const checkWin = () => {
        for(let i = 0; i < winnerPatterns.length; i++) {
            let result = checkPattern(winnerPatterns[i])
            if (result !== 't') {
                return result
            }
        }
        return "t"
    }

    const resetGame = () => {
        setCount(0)
        data = ["","","","","","","","",""]
        setLock(false)

        // not the best solution but works
        // probably better to keep all box states in an state array, then it will be easy to clean all.
        boxes.map((e)=> {
            e.current.innerHTML = ''
        })
        setWinnerText("")
    }

    return (
        <div className="container">
            <h1 className="title">Tac Tic Toe</h1>
            <h3 className="winnerText">{winnerText}</h3>
            <div className="board">
                <div className="row1">
                    <div className="box" ref={box0} onClick={(e)=> { toggle(e, 0)}}></div>
                    <div className="box" ref={box1}  onClick={(e)=> { toggle(e, 1)}}></div>
                    <div className="box" ref={box2}  onClick={(e)=> { toggle(e, 2)}}></div>
                </div>

                <div className="row1">
                    <div className="box" ref={box3}  onClick={(e)=> { toggle(e, 3)}}></div>
                    <div className="box" ref={box4}  onClick={(e)=> { toggle(e, 4)}}></div>
                    <div className="box" ref={box5}  onClick={(e)=> { toggle(e, 5)}}></div>
                </div>

                <div className="row1">
                    <div className="box" ref={box6}  onClick={(e)=> { toggle(e, 6)}}></div>
                    <div className="box" ref={box7}  onClick={(e)=> { toggle(e, 7)}}></div>
                    <div className="box" ref={box8}  onClick={(e)=> { toggle(e, 8)}}></div>
                </div>
            </div>
            <div>
                <button type="button" className="reset" onClick={()=>{resetGame()}}>Reset</button>
            </div>
        </div>
    )
}

export default Tictactoe