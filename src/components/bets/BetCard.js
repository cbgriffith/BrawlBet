import React from "react"
import Container from 'react-bootstrap/Container';
import { Button } from "react-bootstrap"
import { BetModal } from "./BetModal";
import { Card } from "react-bootstrap";
import "./Bet.css"

export const BetCard = ({ bet }) => {
    const [modalShow, setModalShow] = React.useState(false);


    // function to round numbers to 2nd decimal
    function round(num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }

    let isUnderdog;
    if (bet.odds > 0) {
        isUnderdog = "+";
    } else {
        isUnderdog = ""
    }


    let oddsInDecimal;
    if (bet.odds > 0) {
        oddsInDecimal = (bet.odds / 100) + 1;
    } else if (bet.odds < 0) {
        oddsInDecimal = (-100 / bet.odds) + 1
    }

    let moneyWonLost;
    let singleBetWon;
    if (bet.betResult === "Win") {
        moneyWonLost = bet.betAmount * oddsInDecimal;
        singleBetWon = bet.betAmount * oddsInDecimal - bet.betAmount;
        singleBetWon = round(singleBetWon).toLocaleString()
    } else if (bet.betResult === "Loss") {
        moneyWonLost = bet.betAmount * -1
        //Display the absolute value so that formatting looks nicer
        moneyWonLost = Math.abs(moneyWonLost)
    }

    //Show a negative sign before the $ when you lose a bet
    let isLoser;
    if (bet.betResult === "Loss") {
        isLoser = "-"
    } else {
        isLoser = ""
    }

    //Display no amount if the fight hasn't happened yet
    let winLossPending;
    if (bet.betResult === "Win") {
        winLossPending = "Total Payout:"
    } else if (bet.betResult === "Loss") {
        winLossPending = "Money Lost:"
    } else {
        winLossPending = ""
        isLoser = ""
        moneyWonLost = ""
    }

    let showDollarSymbol
    if (bet.betResult === "Win" || bet.betResult === "Loss") {
        showDollarSymbol = "$"
    } else {
        showDollarSymbol = ""
    }

    let iWonSomeMoney;
    if (bet.betResult === "Win") {
        iWonSomeMoney = "Money Won: "
    } else {
        iWonSomeMoney = ""
    }

    let dollaBillsYall = ""
    if (singleBetWon > 0) {
        dollaBillsYall = "$"
    } else {
        dollaBillsYall = ""
    }

    if (moneyWonLost > 0 || moneyWonLost < 0) {
        moneyWonLost = round(moneyWonLost).toLocaleString()
    } else {
        moneyWonLost = ""
    }

    var today = new Date(bet.date);
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

    if (+localStorage.activeUser === bet.userId) {
        return (
            <Container>
                <Card border="dark" bg="dark" className="mt-4 mb-4" style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Header><Card.Title>{bet.fighterBetOn} over {bet.fighterBetAgainst}</Card.Title></Card.Header>
                        <Card.Subtitle>{date}</Card.Subtitle>
                        <div className="bet__bettingHouse">Betting House: {bet.bettingHouse}</div>
                        <div className="bet__odds">Odds: {isUnderdog}{bet.odds}</div>
                        <div className="bet__betAmount">Bet Amount: ${bet.betAmount}</div>
                        <div className="bet__betResult">Result: {bet.betResult} </div>
                        {/* <div>Odds in decimal: {oddsInDecimal}</div> */}
                        <div>{iWonSomeMoney} {dollaBillsYall}{singleBetWon}</div>
                        <div>{winLossPending} {isLoser}{showDollarSymbol}{moneyWonLost}</div>
                        <Button className="mt-2" variant="outline-secondary" style={{ backgroundColor: "#ecdf90", color: "black" }} onClick={() => setModalShow(true)}>
                            Edit Outcome
                        </Button>
                        <BetModal
                            key={bet.id}
                            singleBet={bet}
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