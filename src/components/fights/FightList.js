import React, { useContext, useEffect } from "react"
import { FightContext } from "./FightProvider"
import { FightCard } from "./FightCard"
import "./Fight.css"

export const FightList = () => {
  const { fights, getFights } = useContext(FightContext)
  

  //useEffect - reach out to the world for something
  useEffect(() => {
    getFights()
// eslint-disable-next-line
  }, [])

//   fights.sort((a,b) => new Date(a.dates.start.localDate) - new Date(b.dates.start.localDate))
  return (
    <>
    <h1>Fights</h1>
    <div className="fights">
      {
        fights.map(fight => {
          return <FightCard key={fight.id} fight={fight} />
        })
      }
    </div>
    </>
  )
}