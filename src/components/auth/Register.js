import React, { useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    // eslint-disable-next-line
    const verifyPassword = useRef()
    const conflictDialog = useRef()
    const navigate = useNavigate()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            username: username.current.value,
                            password: password.current.value
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("activeUser", createdUser.id)
                                localStorage.setItem("activeEmail", createdUser.email)
                                localStorage.setItem("activeUsername", createdUser.username)
                                localStorage.setItem("activePassword", createdUser.password)
                                props.setLoggedin(true)
                                navigate("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })

    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required autoFocus />
                </fieldset>

                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <button type="submit" variant="outline-secondary" style={{ backgroundColor: "#ecdf90", color: "black" }} className="btn btn-block mt-2"> Register </button>
                </fieldset>
            </form>
            <section className="link--register">
                <Link to="/login">Already a member?</Link>
            </section>
        </main>
    )
}
