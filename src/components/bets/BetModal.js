import React, { useContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import { BetContext } from "./BetProvider";
import { useParams } from 'react-router-dom';

export const BetModal = ({ singleBet, ...props }) => {
  const [saveFighter, setSaveFighter] = useState({})
  const { getBetById, updateBet } = useContext(BetContext)
  const [setBet] = useState({ betResult: "Pending" })
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const { betId } = useParams();


  const handleFighterInputChange = (event) => {
    const newFighterBetOn = { ...saveFighter }
    newFighterBetOn[event.target.id] = event.target.value
    setSaveFighter(newFighterBetOn)
  }

  const handleSaveBet = () => {
    //POST - add
    updateBet({
      bettingHouse: singleBet.bettingHouse,
      fighterBetOn: singleBet.fighterBetOn,
      fighterBetAgainst: singleBet.fighterBetAgainst,
      date: singleBet.date,
      odds: singleBet.odds,
      betAmount: singleBet.betAmount,
      betResult: saveFighter.betResult,
      userId: +localStorage.activeUser,
      fightId: singleBet.fightId,
      id: singleBet.id
    })
  }
  useEffect(() => {
    if (betId) {
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
      <Modal.Header style={{ backgroundColor: "#212529" }} closeButton>
        <Modal.Title  id="contained-modal-title-vcenter">
          Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#212529" }}>
        <Form>
          <Form.Group>
            <Form.Label>Fighter Bet On</Form.Label>
            <Form.Control readOnly type="text" id="fighterBetOn" value={singleBet.fighterBetOn} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fighter Bet Against</Form.Label>
            <Form.Control readOnly type="text" id="fighterBetAgainst" value={singleBet.fighterBetAgainst} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Betting House</Form.Label>
            <Form.Control readOnly type="text" id="bettingHouse" value={singleBet.bettingHouse} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Odds</Form.Label>
            <Form.Control type="number" name="odds" id="odds" readOnly value={singleBet.odds} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bet Amount</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control id="betAmount" name="betAmount" type="number" readOnly value={singleBet.betAmount} />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Fight Result</Form.Label>
            <Form.Select aria-label="Default select example" onChange={handleFighterInputChange} id="betResult">
              <option value="0">Select a result</option>
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
              <option value="Pending">Pending</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#212529" }}>
        <Button variant="outline-secondary" style={{ backgroundColor: "#ecdf90", color: "black" }} onClick={() => {
          props.onHide()
          handleSaveBet()
        }}>Make Change</Button>
      </Modal.Footer>
    </Modal>
  );
}