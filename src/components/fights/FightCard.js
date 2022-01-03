import React from "react"
import "./Fight.css"

export const FightCard = ({fight}) => {
    // State for the drop down
    //handlecontrolledchangeinput 
    //shows odds depending on whats in state
    console.log(fight)
    return (
        <section className="fight">
            <h5 className="fight__fighters">{fight.home_team} {fight.bookmakers[0].markets[0].outcomes[1].price} vs {fight.away_team} {fight.bookmakers[0].markets[0].outcomes[0].price}</h5>
            <div className="fight__date">Fight Date: {fight.commence_time}</div>
            {/* <div>Betting House: {fight.bookmakers.map(bookmaker => bookmaker.title).join(" ")}</div> */}
            <select value={[fight.bookmakers]} className="form-control">
                    <option value="0">Select a betting house</option>
                    {fight.bookmakers.map(bookmaker => <option value={bookmaker.key}>{bookmaker.title}</option>)}
            </select>
            <div>Odds: {fight.bookmakers[0].markets[0].outcomes[0].price}</div>
            <div>Odds: {fight.bookmakers[0].markets[0].outcomes[1].price}</div>
            <hr></hr>
        </section>
        )
}