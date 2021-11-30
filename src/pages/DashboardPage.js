import React from "react";


import { Container, Card, Navbar, Button } from 'react-bootstrap';
import NavBarHeader from "../components/NavBarHeader";
import Loader from "react-loader-spinner";
import NavBarFooter from "../components/Footer";

export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            challengeWord: '',
            definitions: [],
            gameScores: 0,
            correctAns: 0,
            correctAnsNone: 0,
            questionNo: 1,
            isLoading: true,
            wrongGuess: 0
        }


    }

    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo === null) {
            this.props.history.push('/signin');
        }
        this.getChallengeWord();

    }

    handleChange = e => {
        const { name, value } = e.target;
        if (value === 'none') {
            this.setState({
                correctAnsNone: 1
            })
        } else {
            this.setState({
                correctAns: 1
            })
        }
    }


    getChallengeWord() {

        fetch("https://random-word-api.herokuapp.com/word?number=1").then((res) => res.json())
            .then((data) => {
                this.setState({
                    challengeWord: data[0]
                });
                this.getDictionaryDefinition(data[0]);


            })
    }

    getDictionaryDefinition(challengeWord) {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + challengeWord).then((res) => res.json())
            .then((data) => {
                let words = data[0];

                this.setState({
                    definitions: words.meanings[0].definitions
                })
            }).catch((error) => {
                //console.log(error);
                this.getChallengeWord();
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    nextQuestion = () => {

        if (this.state.correctAnsNone !== 0 || this.state.correctAns !== 0) {
            let gameScore;
            this.setState({
                isLoading: true
            })
            if (this.state.correctAnsNone === 1) {
                gameScore = 0;
                this.setState({
                    wrongGuess: this.state.wrongGuess + 1
                })
            }

            if (this.state.correctAns === 1) {
                gameScore = 1;
            }


            let overallscore = this.state.gameScores + gameScore;
            this.setState({
                questionNo: this.state.questionNo + 1,
                gameScores: overallscore
            })

            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            let userGameScore = {
                userInfo: userInfo,
                gameScore: overallscore
            }

            localStorage.setItem(userInfo.email, JSON.stringify(userGameScore))

            this.setState({
                challengeWord: '',
                definitions: [],
                correctAns: 0,
                correctAnsNone: 0
            })

            this.getChallengeWord();
        } else {
            alert("Please fill values")
        }

    }


    render() {

        const { questionNo, challengeWord, definitions, gameScores, isLoading, wrongGuess } = this.state;

        return (
            <>
                <NavBarHeader />

                <Container className="main-container">
                    <div className="question ml-sm-5 mt-5 pl-sm-5 pt-2">

                        <div className="navbar">
                            <h5 className="text-left"> Game Score: {gameScores}</h5>
                            <h5 className="text-right"> Wrong guesses: {wrongGuess} out of 3</h5>
                        </div>

                        <Card >
                            <Card.Body>
                                {wrongGuess >= 3 ? (
                                    <div className="py-2 h5 text-center"><b>Your Game is Over! Better luck Next time.</b></div>
                                ) : (
                                    <>
                                        {isLoading ? (
                                            <Loader type="ThreeDots" className="text-center" color="#00BFFF" height={100} width={100} />
                                        ) : (
                                            <div className="mt-3">
                                                <div className="py-2 h5"><b>CHALLENGE WORD: {challengeWord}</b></div>
                                                <div className="py-2 h5"><b>{questionNo}. What does this word mean?</b></div>

                                                <div className="ml-md-3 mt-4 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">


                                                    {definitions.map((item, key) => (

                                                        <label className="options" key={key} >{item.definition}
                                                            <input type="radio" name={key} value={item.definition} onChange={this.handleChange} /> <span className="checkmark"></span> </label>

                                                    ))}

                                                    <label className="options">None of above
                                                        <input type="radio" name="radio" value="none" onChange={this.handleChange} /> <span className="checkmark"></span> </label> </div>


                                                <div className="row">
                                                    <div className="text-left submit-answer mt-4" >
                                                        <Button variant="secondary" size="sm" onClick={this.nextQuestion}>
                                                            Submit
                                                        </Button>
                                                    </div>

                                                </div>

                                            </div>)}

                                    </>)}
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
                <NavBarFooter />
            </>
        );
    }
}