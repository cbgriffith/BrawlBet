import React, { useContext, useEffect } from "react"
import { FightContext } from "./FightProvider"
import { FightCard } from "./FightCard"
import { Container } from "react-bootstrap"
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
      <Container className="mt-5 pt-5">
        <h1>Choose A Fight</h1>
        <div className="fights">
          {
            fights.map(fight => {
              return <FightCard key={fight.id} fight={fight} />
            })
          }
        </div>
      </Container>
    </>
  )
}