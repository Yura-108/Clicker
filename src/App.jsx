import {useEffect, useState} from 'react'
import './App.css'
import ShopCard from "./components/shopCard.jsx";
import {skillsSet} from "./assets/skillSet.js";
import Message from "./components/message.jsx";

function App() {

    const [count, setCount] = useState(3000)
    const [countGem, setCountGem] = useState(1500)
    const [skills, setSkills] = useState(skillsSet)

    function advanceIncrease() {
        if (Math.random() < 0.1) {
            setCountGem(countGem => countGem + 1)
        }
        setCount(count => count + 1 + skills.plusClick.quantity)
    }


    skills.factory.slice(0,5).forEach(el => {
        useEffect(() => {
            const interval = setInterval(() => {
                if (el.quantity) {
                    setCount(count => count + el.quantity)
                }
            }, 1000 * el.efficiency)
            return () => clearInterval(interval)
        }, [skills])
    })
    skills.factory.slice(5,10).forEach(el => {
        useEffect(() => {
            const interval = setInterval(() => {
                if (el.quantity) {
                    setCount(count => count + el.quantity * 10)
                    setCountGem(prev => prev + el.quantity)
                }
            }, 1000 * el.efficiency)
            return () => clearInterval(interval)
        }, [skills])
    })

    function buyFactory(cost, type) {
        if (type === "#1faee9") {
            if (count >= cost) {
                setCount(prev => prev - cost)
                setSkills({...skills, factory: skills.factory.map(el => (
                        {...el, quantity: el.cost === cost ? el.quantity + 1 : el.quantity, cost: el.cost === cost ? el.cost * 2 : el.cost}
                    ))})
                return
            }
        }
        else if (type === "#00a550") {
            if (countGem >= cost) {
                setCountGem(prev => prev - cost)
                setSkills({...skills, factory: skills.factory.map(el => (
                        {...el, quantity: el.cost === cost ? el.quantity + 1 : el.quantity, cost: el.cost === cost ? el.cost * 2 : el.cost}
                    ))})
                return
            }
        }
        return alert("You don't have enough coins")

    }

    function plusClick() {
        if (count >= skills.plusClick.cost) {
            setCount(count => count - skills.plusClick.cost)
            setSkills({...skills, plusClick: {...skills.plusClick,
                        quantity: skills.plusClick.quantity + 1,
                        cost: skills.plusClick.cost * 5}})
        } else {
            alert("You don't have enough coins")
        }
    }

    function clickBoard(e) {
        //console.log(e.target.children)
        const checkers = document.querySelectorAll(".circle")
        const target = document.querySelectorAll(".targeted")
        if (e.target.classList.contains("blackSquare")) {
            if (!e.target.children.length) {
                const circle = document.createElement("div")
                circle.classList.add("circle")
                e.target.append(circle)
            }
        } else if (e.target.classList.contains("circle")) {
            checkers.forEach(el => {
                if (el.classList.contains("targeted")) {
                    el.classList.remove("targeted")
                }
            })
            e.target.classList.add("targeted")
        }
    }

    return (
        <div className="App">
            <div className="board" onClick={(e) => clickBoard(e)}>
                <div className="blackSquare A8">
                    <div className="circle"></div>
                </div>
                <div className="whiteSquare"></div>
                <div className="blackSquare B8">
                    <div className="circle"></div>
                </div>
                <div className="whiteSquare C8"></div>
                <div className="blackSquare">
                    <div className="circle"></div>
                </div>
                <div className="whiteSquare"></div>
                <div className="blackSquare">
                    <div className="circle"></div>
                </div>
                <div className="whiteSquare"></div>

                <div className="whiteSquare"></div>
                <div className="blackSquare"></div>
                <div className="whiteSquare"></div>
                <div className="blackSquare"></div>
                <div className="whiteSquare"></div>
                <div className="blackSquare"></div>
                <div className="whiteSquare"></div>
                <div className="blackSquare"></div>


            </div>
            <div className="balance">
                <h1 style={{margin: 0}}>Balance</h1>
                <h2 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Coins: {count} <img style={{marginLeft: "10px"}} width="32px" src="https://cdn.icon-icons.com/icons2/1383/PNG/512/coin_94963.png" alt=""/></h2>
                <h2 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Gems: {countGem} <img style={{marginLeft: "10px"}} width="32px" src="https://cdn.icon-icons.com/icons2/1508/PNG/512/emeraldthememanagericon_104628.png"></img></h2>

            </div>
            <div className="clickZone">
                <div className="clicker" onClick={advanceIncrease}>
                    <h1>CLICK</h1>
                </div>
            </div>
            <div className="shopZone">
                <ShopCard factory={skills.plusClick} buy={plusClick} />
            </div>
            <h1 style={{color: "#1faee9", margin: "20px 0"}}>Factories</h1>
            <div className="shopZone">
                {skills.factory.slice(0, 5).map((factory,i) => <ShopCard factory={factory} buy={buyFactory} colorBottom={"#1faee9"} key={i} />)}
            </div>
            <h1 style={{color: "#00a550", marginTop: "20px"}}>Advanced Factories</h1>
            <div className="shopZone">
                {skills.factory.slice(5, 10).map((factory,i) => <ShopCard factory={factory} buy={buyFactory} colorBottom={"#00a550"} key={i} />)}
            </div>
            <div className="shopZone" style={{height: "200px"}}>

            </div>
        </div>
    )
}

export default App
