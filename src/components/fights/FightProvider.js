import React, { useState, createContext } from "react"

export const FightContext = createContext()

export const FightProvider = (props) => {
    const [fights, setFights] = useState([])

    const getFights = () => {
        return fetch("https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds/?regions=us&apiKey=2935667468d35c06f490e40a424c95d7&markets=h2h,spreads&oddsFormat=american")
        .then(res => res.json())
        .then(setFights)
    }

    const addFights = fightObj => {
        return fetch("http://localhost:8088/fights", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fightObj)
        })
        .then(getFights)
    }

    const getFightById = (id) => {
        return fetch(`http://localhost:8088/fights/${id}?_expand=user`)
            .then(res => res.json())
    }

    const deleteFight = fightId => {
        return fetch(`http://localhost:8088/fights/${fightId}`, {
            method: "DELETE"
        })
            .then(getFights)
    }

    const updateFight = fight => {
        return fetch(`http://localhost:8088/fights/${fight.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(fight)
        })
          .then(getFights)
      }

    return (
        <FightContext.Provider value={{
            fights, getFights, addFights, getFightById, deleteFight, updateFight
        }}>
            {props.children}
        </FightContext.Provider>
    )
}