import React, { useState } from "react"
import "./Fight.css"

export const FightCard = ({fight}) => {
    // State for the drop down
    //handlecontrolledchangeinput 
    const [betHouse, setBetHouse] = useState(0);
    const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newBetHouse = { ...betHouse }
        //set the property to the new value
        newBetHouse[event.target.id] = event.target.value
        //update state
        setBetHouse(newBetHouse)
      }
    const homeOdds = fight.bookmakers.find(x => x.key === betHouse.chooseBetMaker)?.markets[0].outcomes[1].price
    const awayOdds = fight.bookmakers.find(x => x.key === betHouse.chooseBetMaker)?.markets[0].outcomes[0].price
    console.log(betHouse)
    return (
        <section className="fight">
            <h4 className="fight__fighters">{fight.home_team} {homeOdds} vs {fight.away_team} {awayOdds}</h4>
            <h5 className="fight__date">Fight Date: {fight.commence_time}</h5>
            {/* <div>Betting House: {fight.bookmakers.map(bookmaker => bookmaker.title).join(" ")}</div> */}
            <select id="chooseBetMaker" onChange={handleControlledInputChange} className="form-control">
                    <option value="0">Select a betting house</option>
                    {fight.bookmakers.map(bookmaker => <option value={bookmaker.key}>{bookmaker.title}</option>)}
            </select>
            <hr></hr>
        </section>
        //  }
        )
}