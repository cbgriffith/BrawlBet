import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BetContext } from "./BetProvider"
import Container from 'react-bootstrap/Container';
import { Button } from "react-bootstrap"
import { BetModal } from "./BetModal";
import { Card } from "react-bootstrap";
import "./Bet.css"

export const BetCard = ({bet}) => {
    // const {deleteBet} = useContext(BetContext)
    const navigate = useNavigate()
    const [betHouse, setBetHouse] = useState(0);
    const [fighterSelect, setFighterBetOn] = useState(0);
    const [modalShow, setModalShow] = React.useState(false);
    const [saveFighter, setSaveFighter] = useState({})


    // const handleDelete = () => {
    //     deleteBet(bet.id)
    //     .then(() => {
    //       navigate("/Bets")
    //     })
    //   }

      let isUnderdog;
      if (bet.odds > 0){
          isUnderdog = "+";
       } else { isUnderdog = ""
    }
      
      
      let oddsInDecimal;
      if (bet.odds > 0){
          oddsInDecimal = (bet.odds/100)+1;
      } else if (bet.odds < 0){
          oddsInDecimal = (-100/bet.odds)+1
      }

      let moneyWonLost;
      if (bet.betResult === "Win"){
      moneyWonLost = bet.betAmount * oddsInDecimal;
      } else if (bet.betResult === "Loss"){
          moneyWonLost = bet.betAmount * -1
          //Display the absolute value so that formatting looks nicer
          moneyWonLost = Math.abs(moneyWonLost)
      }

      //Show a negative sign before the $ when you lose a bet
      let isLoser;
      if (bet.betResult === "Loss"){
          isLoser = "-"
      } else {
          isLoser = ""
      }

      //Display no amount if the fight hasn't happened yet
      let winLossPending;
      if (bet.betResult === "Win"){
          winLossPending = "Money Won:"
      } else if (bet.betResult === "Loss"){
          winLossPending = "Money Lost:"
      } else {
          winLossPending = ""
          isLoser = ""
          moneyWonLost = ""
      }

      let showDollarSymbol
      if (bet.betResult === "Win" || bet.betResult === "Loss"){
          showDollarSymbol = "$"
      } else {
          showDollarSymbol = ""
      }

    if (+localStorage.activeUser === bet.userId){
    return (
        <Container>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>Bet#{bet.id}</Card.Title>
                    <Card.Subtitle>{bet.date}</Card.Subtitle>
                    <div className="bet__fightInfo">{bet.fighterBetOn} over {bet.fighterBetAgainst}</div>
                    <div className="bet__odds">Odds: {isUnderdog}{bet.odds}</div>
                    <div className="bet__bettingHouse">Betting House: {bet.bettingHouse}</div>
                    <div className="bet__betAmount">Bet Amount: ${bet.betAmount}</div>
                    <div className="bet__betResult">Result: {bet.betResult} </div>
                    <div>Odds in decimal: {oddsInDecimal}</div>
                    <div>{winLossPending} {isLoser}{showDollarSymbol}{moneyWonLost}</div>
                    {/* <button onClick={handleDelete}>Delete</button> */}
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Edit Outcome
                        </Button>
                        <BetModal
                        betHouse={betHouse}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        />
                </Card.Body>
            </Card>
        </Container>
        )
        } else {
            return ""
        }
}