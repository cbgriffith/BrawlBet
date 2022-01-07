import React, { useContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import { BetContext } from "../bets/BetProvider";
import "./Fight.css"






export const FightModal =({fight, betHouse,  ...props}) => {
    const [saveFighter, setSaveFighter] = useState({})
    const [fighterSelect, setFighterBetOn] = useState(0);
    // const [betHouseM, setBetHouseM] = useState(0);
    const { addBet, getBetById, updateBet } = useContext(BetContext)
    const [bet, setBet] = useState({ betResult: "Pending"})



    
    const handleFighterSelectChange = (event) => {
        const newFighterBetOn = { ...fighterSelect }
        newFighterBetOn[event.target.id] = event.target.value
        setFighterBetOn(newFighterBetOn)
        }
        const handleFighterInputChange = (event) => {
          const newFighterBetOn = { ...saveFighter }
          newFighterBetOn[event.target.name] = event.target.value
          setSaveFighter(newFighterBetOn)
          }
        const homeOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[1].price
        const awayOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[0].price
        // console.log(fighterSelect.fighterBetOn)
        // console.log(newFighterBetOn)
        // console.log(homeOdds)
        // console.log(awayOdds)
        const handleSaveBet = () => {
            // if (betId){
            //   //PUT - update
            //   updateBet({
            //       bettingHouse: bet.bettingHouse,
            //       fighterBetOn: bet.fighterBetOn,
            //       fighterBetAgainst: bet.fighterBetAgainst,
            //       date: bet.date,
            //       userId: +localStorage.activeUser,
            //       odds: bet.odds,
            //       betAmount: bet.betAmount,
            //       betResult: bet.betResult,
            //       id: bet.id
            //   })
            //   .then(() => navigate("/bets"))
            // } else {
              // console.log(bet)
              //POST - add
              addBet({
                  bettingHouse: betHouse.chooseBetMaker,
                  fighterBetOn: fighterSelect.fighterBetOn,
                  fighterBetAgainst: fight.fighterBetAgainst,
                  date: fight.commence_time,
                  odds: +(fighterSelect.fighterBetOn === fight.home_team) && (fighterSelect.fighterBetOn !== "0") && (fighterSelect !== 0) ?  homeOdds : (fighterSelect.fighterBetOn === fight.away_team) && (fighterSelect.fighterBetOn !== "0") && (fighterSelect !== 0) ? awayOdds : "",
                  betAmount: +saveFighter.betAmount,
                  betResult: bet.betResult,
                  userId: +localStorage.activeUser,
                  fightId: fight.id
              })
            //   .then(() => navigate("/bets"))
            }
          fighterSelect.fighterBetOn === fight.home_team ? fight.fighterBetAgainst = fight.away_team : fight.fighterBetAgainst = fight.home_team

   
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton> 
          <Modal.Title id="contained-modal-title-vcenter">
            Place a Bet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form>
                    <Form.Group controlId="form.Name">
                        <Form.Label>Fighter To Bet On</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={handleFighterSelectChange} id="fighterBetOn" value={fighterSelect.fighterBetOn}> 
                            <option value="0">Select A Fighter</option>
                            <option value={fight.home_team}>{fight.home_team}</option>
                            <option value={fight.away_team}>{fight.away_team}</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Betting House Selected</Form.Label>
                        <Form.Control readOnly type="text" id="bettingHouse" value={betHouse.chooseBetMaker} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Odds</Form.Label>
                        <Form.Control type="number" name="odds" id="odds" readOnly value={(fighterSelect.fighterBetOn === fight.home_team) && (fighterSelect.fighterBetOn !== "0") && (fighterSelect !== 0) ?  homeOdds : (fighterSelect.fighterBetOn === fight.away_team) && (fighterSelect.fighterBetOn !== "0") && (fighterSelect !== 0) ? awayOdds : ""} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Bet Amount</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control id="betAmount" name="betAmount" type="number" placeholder="Enter bet amount" onChange={handleFighterInputChange} />
                        </InputGroup>
                    </Form.Group>
                 
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
              props.onHide()
              handleSaveBet()
              }}>Place Bet</Button>
        </Modal.Footer>
      </Modal>
    );
  }