import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"


export const Logout = (props) => {
    const navigate = useNavigate()
    
    // clear session storage
    localStorage.clear()
    // props.setLoggedin(false)
    // navigate("/")
}