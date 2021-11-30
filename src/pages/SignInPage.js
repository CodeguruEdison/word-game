import React from "react";
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../components/Validator';

import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';

export default class SignInPage extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
        }
    }

    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo === null){
            this.props.history.push('/signin');
        } else {
            this.props.history.push('/dashboard');
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }


    login = (e) => {

        e.preventDefault();
        let errors = this.validateLoginForm();
        if (errors === true) {
            this.setState({
                errors: errors,
            })
            console.log(this.state.formData);

            let userData = JSON.parse(localStorage.getItem("userData"));
            if (userData != null) {
                userData.some((el) => {
                    if (el.email === this.state.formData.email) {
                        if (el.password == this.state.formData.password) {

                            let userInfo = {
                                token: Math.random().toString(36).substr(2),
                                email: el.email,
                                fname: el.fname
                            }
                            localStorage.setItem("userInfo", JSON.stringify(userInfo));
                            this.props.history.push('/dashboard');
                        } else {
                            this.setState({
                                errors: { password: "Invalid Password!" },
                            })
                        }
                    } else {
                        this.setState({
                            errors: { email: "User not exists!" },
                        })
                    }

                });
            } else {
                console.log(userData);
                this.setState({
                    errors: { email: "User not exists!" },
                })
            }



        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    userExists = (userlist, email) => {
        return userlist.some((el) => {
            return el.email === email;
        })
    };

    render() {
        const { errors, formSubmitted } = this.state;
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div className="col-md-8 col-lg-6">


                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8 mx-auto login-content">
                                            <h3 className="login-heading mb-4">Welcome back!</h3>

                                            <form onSubmit={this.login}>
                                                <div className="mt-1 input-border-radius">
                                                    <FormGroup controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                                                        {errors.email &&
                                                            <span className="error-msg">{errors.email}</span>
                                                        }
                                                    </FormGroup>
                                                </div>
                                                <div className="mt-3 input-border-radius">
                                                    <FormGroup controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                                                        <FormLabel>Password</FormLabel>
                                                        <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                                                        {errors.password &&
                                                            <span className="error-msg">{errors.password}</span>
                                                        }
                                                    </FormGroup>
                                                </div>
                                                <div className="d-grid mt-4">
                                                    <button className="input-border-radius btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Sign in</button>
                                                    <div className="text-center">
                                                        <a className="small" href="/signup">SignUp</a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </>
        );
    }
}