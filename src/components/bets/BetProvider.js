import React, { useState, createContext } from "react"

export const BetContext = createContext()

export const BetProvider = (props) => {
    const [bets, setBets] = useState([])

    const getBets = () => {
        return fetch("http://localhost:8088/bets")
            .then(res => res.json())
            .then(setBets)
    }

    const addBet = betObj => {
        return fetch("http://localhost:8088/bets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(betObj)
        })
            .then(getBets)
    }

    const getBetById = (id) => {
        return fetch(`http://localhost:8088/bets/${id}?_expand=user`)
            .then(res => res.json())
    }

    const deleteBet = betId => {
        return fetch(`http://localhost:8088/bets/${betId}`, {
            method: "DELETE"
        })
            .then(getBets)
    }

    const updateBet = bet => {
        return fetch(`http://localhost:8088/bets/${bet.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bet)
        })
            .then(getBets)
    }

    return (
        <BetContext.Provider value={{
            bets, getBets, addBet, getBetById, deleteBet, updateBet
        }}>
            {props.children}
        </BetContext.Provider>
    )
}