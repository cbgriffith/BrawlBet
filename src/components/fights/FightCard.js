import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { FightModal } from "./FightModal"
import { Card } from "react-bootstrap";
import "./Fight.css"




export const FightCard = ({ fight }) => {
  // const navigate = useNavigate()
  // State for the drop down
  //handlecontrolledchangeinput 
  const [betHouse, setBetHouse] = useState(0);
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

  const homeOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[1].price
  const awayOdds = fight.bookmakers.find(x => x.title === betHouse.chooseBetMaker)?.markets[0].outcomes[0].price

  var today = new Date(fight.commence_time);
  var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

  let plusMinusHome = ""
  if (homeOdds > 0) {
    plusMinusHome = "+"
  } else if (homeOdds < 0) {
    plusMinusHome = ""
  }
  let plusMinusAway = ""
  if (awayOdds > 0) {
    plusMinusAway = "+"
  } else if (awayOdds < 0) {
    plusMinusAway = ""
  }

  return (
    
      <div className="fight">
        <Card bg="dark" id="fight" className="mt-5 mb-5" style={{ width: '32rem' }}>
          <Card.Img variant="top" src={require('../../images/brawlbet.png')} style={{ width: "auto", height: "200px" }} alt="brawl bet" />
          <Card.Body>
            <Card.Title>{fight.home_team} {plusMinusHome}{homeOdds} vs {fight.away_team} {plusMinusAway}{awayOdds}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Fight Date: {date}</Card.Subtitle>
            <select id="chooseBetMaker" onChange={handleBetHouseChange} className="form-control">
              <option value="0">Select a betting house</option>
              {fight.bookmakers.map(bookmaker => <option value={bookmaker.title}>{bookmaker.title}</option>)}
            </select>
            {/* Only show the Bet button if a betting house is selected */}
            {betHouse !== 0 && betHouse.chooseBetMaker !== "0" ?
              <Button className="my-1" variant="outline-secondary" style={{ backgroundColor: "#ecdf90", color: "black" }} onClick={() => setModalShow(true)}>
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
      </div>
    
  )
}