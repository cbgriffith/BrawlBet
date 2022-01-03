import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { BetProvider } from "./bets/BetProvider"
import { BetList } from "./bets/BetList"
import { BetForm } from "./bets/BetForm"
import { FightProvider } from "./fights/FightProvider"
import { FightList } from "./fights/FightList"

export const ApplicationViews = () => {
    return (
                        <BetProvider>
                            <FightProvider>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="bets/*" element={<BetList />} />
                                    <Route path="bets/create/*" element={<BetForm />} />
                                    <Route path="bets/edit/:betId/*" element={<BetForm />} />

                                    <Route path="fights/*" element={<FightList />} />
                                </Routes>
                            </FightProvider>
                        </BetProvider>
    )}