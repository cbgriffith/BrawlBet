import React, { useContext, useEffect } from "react"
import { BetContext } from "./BetProvider"
import { BetCard } from "./BetCard"
import "./Bet.css"
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';

export const BetList = () => {
  const { bets, getBets } = useContext(BetContext)
  const navigate = useNavigate()
  

  //useEffect - reach out to the world for something
  useEffect(() => {
    getBets()
// eslint-disable-next-line
  }, [])

//   bets.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <>
    <Container>
    <h1>Bets</h1>
      <button onClick={() => navigate("/bets/create")}>
          Add Bet
      </button>
    <div className="bets">
      {
        bets.map(bet => {
          return <BetCard key={bet.id} bet={bet} />
        })
      }
    </div>
    </Container>
    </>
  )
}