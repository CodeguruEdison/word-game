import React from "react";


import { Container, Button,Table } from 'react-bootstrap';
import NavBarHeader from "../components/NavBarHeader";

export default class LeaderBoardPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userInfo: {},
            gameScore: {},
            userData: []
        }
    }

    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo === null) {
            this.props.history.push('/signin');
        } else {

            let gameScore = JSON.parse(localStorage.getItem(userInfo.email));
            let userData = JSON.parse(localStorage.getItem("userData"));
            this.setState({
                userInfo: userInfo,
                gameScore: gameScore,
                userData: userData
            })

        }
    }

    getGameScore (email) {

        if(localStorage.getItem(email)){
            return JSON.parse(localStorage.getItem(email)).gameScore;
        } else {
            return 0;
        }
       
    }

    render() {

        const { userData }  = this.state;
        return (
            <>
                <NavBarHeader />
                <Container >
                    <div className="mt-5">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Game Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        {userData.map((item, key) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{item.fname}</td>
                                <td>{item.email}</td>
                                <td>{this.getGameScore(item.email)}</td>
                            </tr>
                        ))}   
                        </tbody>
                    </Table>
                    </div>
                </Container>

            </>
        );
    }
}