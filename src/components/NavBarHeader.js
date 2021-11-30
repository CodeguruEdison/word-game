
import React from "react";
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function NavBarHeader() {

    let history = useHistory();

    function signOut() {
        localStorage.removeItem("userInfo");
        history.push('/signin');
    }

    return (
        <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
            <Container>
                <Navbar.Brand>Word Trivia Game</Navbar.Brand>
              
                <Nav className="me-auto">
                    <Nav.Link href="dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="profile">Profile</Nav.Link>
                    <Nav.Link href="leader-board">Leader Board</Nav.Link>
                   
                </Nav>
                <Button variant="outline-light" onClick={signOut}>Sign Out</Button>

            </Container>
        </Navbar>
    );

}