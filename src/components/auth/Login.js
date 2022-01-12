import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"


export const Login = (props) => {
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const navigate = useNavigate() //now needs to be navigate and useNavigate()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("activeUser", exists.id)
                    localStorage.setItem("activeEmail", exists.email)
                    localStorage.setItem("activeUsername", exists.username)
                    localStorage.setItem("activePassword", exists.password)
                    props.setLoggedin(true)
                    navigate("/") // change to navigate("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login pt-5">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Brawl Bet</h1>
                    <h3>Please sign in</h3>
                    <fieldset>
                        <label htmlFor="email"> Email address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit" variant="outline-secondary" style={{ backgroundColor: "#ecdf90", color: "black" }} className="btn btn-block mt-2">
                            Sign in
                        </button>
                    </fieldset>
                    <section className="mt-5 ml-2 link--register">
                        <Link style={{ color: "#ecdf90" }} to="/register">Not a member yet?</Link>
                    </section>
                </form>

            </section>
            {/* <section className="mt-5 ml-2 link--register">
                <Link style={{ color: "#ecdf90" }} to="/register">Not a member yet?</Link>
            </section> */}
        </main>
    )
}


