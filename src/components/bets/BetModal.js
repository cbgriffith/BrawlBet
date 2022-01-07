import React, { useContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import { BetContext } from "./BetProvider";
import { useNavigate, useParams } from 'react-router-dom';





export const BetModal =({...props}) => {
    const [saveFighter, setSaveFighter] = useState({})
    const [fighterSelect, setFighterBetOn] = useState(0);
    // const [betHouseM, setBetHouseM] = useState(0);
    const { addBet, getBetById, updateBet } = useContext(BetContext)
    const [bet, setBet] = useState({ betResult: "Pending"})
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const {betId} = useParams();
  const navigate = useNavigate();



    
    // const handleFighterSelectChange = (event) => {
    //     const newFighterBetOn = { ...fighterSelect }
    //     newFighterBetOn[event.target.id] = event.target.value
    //     setFighterBetOn(newFighterBetOn)
    //     }
        const handleFighterInputChange = (event) => {
          const newFighterBetOn = { ...saveFighter }
          newFighterBetOn[event.target.id] = event.target.value
          setSaveFighter(newFighterBetOn)
          }
        // const homeOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[1].price
        // const awayOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[0].price
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
              updateBet({
                  bettingHouse: bet.bettingHouse,
                  fighterBetOn: bet.fighterBetOn,
                  fighterBetAgainst: bet.fighterBetAgainst,
                  date: bet.date,
                  odds: bet.odds,
                  betAmount: bet.betAmount,
                  betResult: bet.betResult,
                  userId: +localStorage.activeUser,
                  fightId: bet.fightId,
                  id: bet.id
              })
            //   .then(() => navigate("/bets"))
            }
        //   fighterSelect.fighterBetOn === fight.home_team ? fight.fighterBetAgainst = fight.away_team : fight.fighterBetAgainst = fight.home_team
            useEffect(() => {
              if (betId){
                getBetById(betId)
                .then(bet => {
                    setBet(bet)
                    setIsLoading(false)
                })
              } else {
                setIsLoading(false)
              }
            
            // eslint-disable-next-line
          }, [])

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
                    <Form.Group>
                        <Form.Label>Bet #{bet.id}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fighter Bet On</Form.Label>
                        <Form.Control readOnly type="text" id="fighterBetOn" value={bet.fighterBetOn} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fighter Bet Against</Form.Label>
                        <Form.Control readOnly type="text" id="fighterBetAgainst" value={bet.fighterBetAgainst} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Betting House</Form.Label>
                        <Form.Control readOnly type="text" id="bettingHouse" value={bet.bettingHouse} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Odds</Form.Label>
                        <Form.Control type="number" name="odds" id="odds" readOnly value={bet.odds} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Bet Amount</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control id="betAmount" name="betAmount" type="number" readOnly value={bet.betAmount} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fight Result</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={handleFighterInputChange} id="betResult"> 
                            <option value="Pending">Pending</option>
                            <option value="Win">Win</option>
                            <option value="Loss">Loss</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
              props.onHide()
              handleSaveBet()
              }}>Make Change</Button>
        </Modal.Footer>
      </Modal>
    );
  }