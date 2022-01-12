import React, { useContext, useEffect } from "react"
import { BetContext } from "./BetProvider"
import { BetCard } from "./BetCard"
import Container from 'react-bootstrap/Container';
import "./Bet.css"


export const BetList = () => {
  const { bets, getBets } = useContext(BetContext)


  //useEffect - reach out to the world for something
  useEffect(() => {
    getBets()
    // eslint-disable-next-line
  }, [])

  //   bets.sort((a,b) => new Date(a.date) - new Date(b.date))
  let betWins = 0
  let betLosses = 0
  let betPending = 0
  let totalMoneySpent = 0
  let oddsInDecimal = 0
  let moneyWonLost = 0
  let moneyPending = 0;
  let showNegative = ""
  let moneyFromBetsWon = 0;
  let moneyFromBetsLost = 0;
  let absoluteLostBets = 0;
  let upDown
  let howMuchUpDown
  let payout


  // function to round numbers to 2nd decimal
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }


  for (let x = 0; x < bets.length; x++) {
    if (+localStorage.activeUser === bets[x].userId) {
      if (bets[x].betResult === "Win") {
        betWins++;
      } else if (bets[x].betResult === "Loss") {
        betLosses++;
      } else if (bets[x].betResult === "Pending") {
        betPending++;
      }
      totalMoneySpent += bets[x].betAmount
      if (bets[x].odds > 0) {
        oddsInDecimal = (bets[x].odds / 100) + 1
      } else if (bets[x].odds < 0) {
        oddsInDecimal = (-100 / bets[x].odds) + 1
      }
      if (bets[x].betResult === "Win") {
        moneyWonLost = bets[x].betAmount * oddsInDecimal
        moneyFromBetsWon += moneyWonLost
      } else if (bets[x].betResult === "Loss") {
        moneyWonLost = bets[x].betAmount * -1
        moneyFromBetsLost += moneyWonLost
      } else if (bets[x].betResult === "Pending") {
        moneyPending += bets[x].betAmount
      }
      if (moneyFromBetsWon < Math.abs(moneyFromBetsLost) && moneyPending !== totalMoneySpent) {
        upDown = "I'm Down"
        howMuchUpDown = moneyFromBetsWon - Math.abs(moneyFromBetsLost)
      } else if (moneyFromBetsWon > Math.abs(moneyFromBetsLost)) {
        upDown = "I'm Up"
        howMuchUpDown = moneyFromBetsWon - Math.abs(moneyFromBetsLost)
      } else if (moneyFromBetsWon === totalMoneySpent || moneyPending === totalMoneySpent) {
        upDown = "I'm Even"
        howMuchUpDown = ""
      }
      if (howMuchUpDown < 0) {
        showNegative = "-"
      } else {
        showNegative = ""
      }
    }
  }
  totalMoneySpent = round(totalMoneySpent).toLocaleString()
  absoluteLostBets = Math.abs(moneyFromBetsLost).toLocaleString()
  moneyFromBetsWon = round(moneyFromBetsWon).toLocaleString()
  moneyPending = round(moneyPending).toLocaleString()
  howMuchUpDown = round(Math.abs(howMuchUpDown)).toLocaleString()
  return (
    <>
      <Container className="mt-5 pt-5">
        <h1>My Bets</h1>
        <div>Wins: {betWins} Losses: {betLosses} Pending: {betPending}</div>
        <div>Total Money Spent: ${totalMoneySpent}</div>
        <div>Total Money From Winning Bets: ${moneyFromBetsWon}</div>
        <div>Total Money From Losing Bets: -${absoluteLostBets}</div>
        <div>Total Money Pending: ${moneyPending}</div>
        {/* <div>{upDown}: {showNegative}${howMuchUpDown}</div> */}

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