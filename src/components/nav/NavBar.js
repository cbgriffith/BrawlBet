import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <Navbar className="p-3" fixed="top" bg="dark" variant="dark">
            <Navbar.Brand style={{ color: "#ecdf90" }} className="ms-5" href="/">Brawl Bet</Navbar.Brand>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/bets">My Bets</Nav.Link>
                    <Nav.Link href="/fights">Fights</Nav.Link>
                </Nav>
            </Container>
            <Nav className="me-5">
                <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>


        </Navbar>
    )
}
// #ecdf90

// style={{ color: "#ecdf90" }}