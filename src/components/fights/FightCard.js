import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import { FightModal } from "./FightModal"
import { Card } from "react-bootstrap";
import "./Fight.css"




export const FightCard = ({fight}) => {
    // const navigate = useNavigate()
    // State for the drop down
    //handlecontrolledchangeinput 
    const [betHouse, setBetHouse] = useState(0);
    const [fighterSelect, setFighterBetOn] = useState(0);
    const [modalShow, setModalShow] = React.useState(false);
    const [saveFighter, setSaveFighter] = useState({})

    const handleBetHouseChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newBetHouse = { ...betHouse }
    
    //set the property to the new value
    newBetHouse[event.target.id] = event.target.value
    
    //update state
    setBetHouse(newBetHouse)
    
      }

    const handleFighterSelectChange = (event) => {
    const newFighterBetOn = { ...fighterSelect }
    newFighterBetOn[event.target.id] = event.target.value
    setFighterBetOn(newFighterBetOn)
    }
    const handleFighterInputChange = (event) => {
      const newFighterBetOn = { ...saveFighter }
      newFighterBetOn[event.target.id] = event.target.value
      setSaveFighter(newFighterBetOn)
      }

    const homeOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[1].price
    const awayOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[0].price
    // let oddsSelected;
    // console.log(betHouse.chooseBetMaker)
    // console.log(fighterSelect)
      
    return (
        <Container>
          <Card id="fight" style={{ width: '30rem' }}>
              <Card.Body>
                <Card.Title>{fight.home_team} {homeOdds} vs {fight.away_team} {awayOdds}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Fight Date: {fight.commence_time}</Card.Subtitle>
                {/* <div>Betting House: {fight.bookmakers.map(bookmaker => bookmaker.title).join(" ")}</div> */}
                <select id="chooseBetMaker" onChange={handleBetHouseChange} className="form-control">
                        <option value="0">Select a betting house</option>
                        {fight.bookmakers.map(bookmaker => <option value={bookmaker.title}>{bookmaker.title}</option>)}
                </select>
                {/* Only show the Bet button if a betting house is selected */}
                { betHouse !== 0 && betHouse.chooseBetMaker !== "0" ? 
                <Button variant="primary" onClick={() => setModalShow(true)}>
                Bet On This
                </Button> : ""}
                <FightModal
                betHouse={betHouse}
                fight={fight}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
              </Card.Body>
          </Card>
        </Container>
        )
}

// {/* Only show the Bet button if a betting house is selected */}
// { betHouse !== 0 && betHouse.chooseBetMaker !== "0" ? 
// <button onClick={() => navigate("/bets/create")}>
//     Bet On This
// </button> : ""}