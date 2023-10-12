import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {

    let navigate = useNavigate()

    return <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate('/')} style={{cursor:'pointer'}}>Home</Navbar.Brand>
            </Container>
            <Nav>
                <Nav.Link onClick={() => navigate('/sign-in')}>SignIn</Nav.Link>
                <Nav.Link onClick={() => navigate('/sign-up')}>SignUp</Nav.Link>
            </Nav>
        </Navbar>
    </>
}

export default Home
