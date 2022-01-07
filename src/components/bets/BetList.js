import React, { useContext, useEffect } from "react"
import { BetContext } from "./BetProvider"
import { BetCard } from "./BetCard"
import "./Bet.css"
import Container from 'react-bootstrap/Container';

export const BetList = () => {
  const { bets, getBets } = useContext(BetContext)
  

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