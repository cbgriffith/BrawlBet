import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import "./Fight.css"




export const FightCard = ({fight}) => {
    const navigate = useNavigate()
    // State for the drop down
    //handlecontrolledchangeinput 
    const [betHouse, setBetHouse] = useState(0);
    const [fighterSelect, setFighterBetOn] = useState(0);
    const [modalShow, setModalShow] = React.useState(false);

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

    const homeOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[1].price
    const awayOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[0].price
    let oddsSelected;
    // console.log(betHouse.chooseBetMaker)
    console.log(fighterSelect)
    function BetFormModal(props) {
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
                            <Form.Control readOnly type="text" defaultValue={betHouse.chooseBetMaker} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Odds</Form.Label>
                            <Form.Control type="text" readOnly defaultValue={(fighterSelect.fighterBetOn === fight.home_team) && (fighterSelect.fighterBetOn !== "0") && (fighterSelect !== 0) ?  homeOdds : awayOdds} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bet Amount</Form.Label>
                            <Form.Control type="number" placeholder="$"/>
                        </Form.Group>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Place Bet</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    return (
        <Container>
        <section className="fight">
            <h4 className="fight__fighters">{fight.home_team} {homeOdds} vs {fight.away_team} {awayOdds}</h4>
            <h5 className="fight__date">Fight Date: {fight.commence_time}</h5>
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
            <BetFormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            <hr></hr>
        </section>
        </Container>
        )
}




// {/* Only show the Bet button if a betting house is selected */}
// { betHouse !== 0 && betHouse.chooseBetMaker !== "0" ? 
// <button onClick={() => navigate("/bets/create")}>
//     Bet On This
// </button> : ""}