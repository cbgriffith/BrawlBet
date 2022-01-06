import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { BetTracker } from "./components/BetTracker.js"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <BetTracker />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)