import React, { useContext, useEffect, useState } from "react"
import { BetContext } from "./BetProvider"
import { FightContext } from "../fights/FightProvider";
import "./Bet.css"
import { useNavigate, useParams } from 'react-router-dom';


export const BetForm = () => {
  const { addBet, getBetById, updateBet } = useContext(BetContext)
  const { fights, getFights } = useContext(FightContext)

  const [bet, setBet] = useState({ betResult: "Pending"})
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const {betId} = useParams();
  const navigate = useNavigate();

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newBet = { ...bet }
    //set the property to the new value
    newBet[event.target.name] = event.target.value
    //update state
    setBet(newBet)
  }

  const [betHouse, setBetHouse] = useState(0);
    const handleControlledInputChangeBet = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newBetHouse = { ...betHouse }
    //set the property to the new value
    newBetHouse[event.target.id] = event.target.value
    //update state
    setBetHouse(newBetHouse)
      }

  const handleSaveBet = () => {
      setIsLoading(true);
      if (betId){
        //PUT - update
        updateBet({
            bettingHouse: bet.bettingHouse,
            fighterBetOn: bet.fighterBetOn,
            fighterBetAgainst: bet.fighterBetAgainst,
            date: bet.date,
            userId: +localStorage.activeUser,
            odds: bet.odds,
            betAmount: bet.betAmount,
            betResult: bet.betResult,
            id: bet.id
        })
        .then(() => navigate("/bets"))
      } else {
        // console.log(bet)
        //POST - add
        addBet({
            bettingHouse: bet.bettingHouse,
            fighterBetOn: bet.fighterBetOn,
            fighterBetAgainst: bet.fighterBetAgainst,
            date: bet.date,
            odds: bet.odds,
            betAmount: bet.betAmount,
            betResult: bet.betResult,
            userId: +localStorage.activeUser,
            fightId: bet.fightId
        })
        .then(() => navigate("/bets"))
      }
    
  }

  useEffect(() => {
      getFights()
      .then(() => {
      if (betId){
        getBetById(betId)
        .then(bet => {
            setBet(bet)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
    // eslint-disable-next-line
  }, [])
  
  //since state controlls this component, we no longer need
  //useRef(null) or ref

    
    return (
      <form className="betForm">
          <h2 className="betForm__title">{betId ? <>Update Bet</> : <>New Bet</>}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="date">Fight date:</label>
                  <input type="date" id="date" onChange={handleControlledInputChange} required className="form-control" name="date" defaultValue={bet.date}/>
              </div>
              <div className="form-group">
                  <label htmlFor="fighterBetOn">Fighter bet on:</label>
                  <input type="text" id="fighterBetOn" onChange={handleControlledInputChange} required className="form-control" placeholder="Fighter bet on" name="fighterBetOn" defaultValue={bet.fighterBetOn}/>
              </div>
              <div className="form-group">
                  <label htmlFor="fighterBetAgainst">Fighter bet against:</label>
                  <input type="text" id="fighterBetAgainst" onChange={handleControlledInputChange} required className="form-control" placeholder="Fighter bet against" name="fighterBetAgainst" defaultValue={bet.fighterBetAgainst}/>
              </div>
              <div className="form-group">
                  <label htmlFor="odds">Bet Odds:</label>
                  <input type="text" id="odds" onChange={handleControlledInputChange} required className="form-control" placeholder="Bet Odds" name="odds" defaultValue={bet.odds}/>
              </div>
              <div className="form-group">
                  <label htmlFor="bettingHouse">Betting house:</label>
                  <input type="text" id="bettingHouse" onChange={handleControlledInputChange} required className="form-control" placeholder="Betting house" name="bettingHouse" defaultValue={bet.bettingHouse}/>
              </div>
              {/* <div className="form-group">
              <select id="chooseBetMaker" onChange={handleControlledInputChangeBet} className="form-control">
                    <option value="0">Select a betting house</option>
                    {fights.bookmakers.map(bookmaker => <option value={bookmaker.key}>{bookmaker.title}</option>)}
              </select>
              </div> */}
              <div className="form-group">
                  <label htmlFor="betAmount">Bet Amount:</label>
                  <input type="text" id="betAmount" onChange={handleControlledInputChange} required className="form-control" placeholder="Bet Amount" name="betAmount" defaultValue={bet.betAmount}/>
              </div>
              <div className="form-group">
                  <label htmlFor="betResult">Bet Result:</label>
                  <select value={bet.betResult} onChange={handleControlledInputChange} className="form-control" name="betResult">
                    <option value="Pending">Pending</option>
                    <option value="Win">Win</option>
                    <option value="Loss">Loss</option>
                  </select>
              </div>
          </fieldset>
          
          <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveBet()
          }}>
        {betId ? <>Save Changes</> : <>Add Bet</>}
        </button>
      </form>
    )
    }
