import React from "react";


import { Container, Button } from 'react-bootstrap';
import '../ProfilePage.css';
import NavBarHeader from "../components/NavBarHeader";
import NavBarFooter from "../components/Footer";
export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userInfo: {},
           
        }
    }

    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo === null) {
            this.props.history.push('/signin');
        } else {

           
            this.setState({
                userInfo: userInfo
              
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

        const { userInfo } = this.state;
        return (
            <>
                <NavBarHeader />
                <div classNameName="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <div className="p-4">
                        <div className=" image d-flex flex-column justify-content-center align-items-center">
                            <button className="btn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button>
                            <span className="name mt-3">{userInfo.fname}</span> <span className="idd">{userInfo.email}</span>
                            
                            
                         
                            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                                <span className="number">Your GameScore is {this.getGameScore(userInfo.email)}</span> 
                            </div>

                        </div>
                    </div>
                </div>
                <NavBarFooter />
            </>
        );
    }
}