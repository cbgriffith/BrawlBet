import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { BetProvider } from "./bets/BetProvider"
import { BetList } from "./bets/BetList"
import { FightProvider } from "./fights/FightProvider"
import { FightList } from "./fights/FightList"
import { Logout } from "./auth/Logout"

export const ApplicationViews = () => {
    const [loggedin, setLoggedin] = useState(false);

  const changeState = (bool) => setLoggedin(bool);
    return (
        <BetProvider>
            <FightProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="bets/*" element={<BetList />} />


                    <Route path="fights/*" element={<FightList />} />

                    <Route path="/logout" element={<Logout setLoggedin={changeState} />} />
                </Routes>
            </FightProvider>
        </BetProvider>
    )
}