import React from "react";

import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../components/Validator';

import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';


export default class SignUpPage extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
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

        if (isEmpty(formData.fname)) {
            errors.fname = "Full Name can't be blank";
        }

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

        if (isEmpty(formData.cpassword)) {
            errors.cpassword = "Confirm Password can't be blank";
        } else if (isContainWhiteSpace(formData.cpassword)) {
            errors.cpassword = "Confirm Password should not contain white spaces";
        } else if (!isLength(formData.cpassword, { gte: 6, lte: 16, trim: true })) {
            errors.cpassword = "Confirm Password's length must between 6 to 16";
        }
        console.log(this.state);
        if (formData.password != formData.cpassword) {
            errors.cpassword = "Confirm Password are not same";
        }



        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo === null){
            this.props.history.push('/signup');
        } else {
            this.props.history.push('/dashboard');
        }
    }


    login = (e) => {

        let userData = localStorage.getItem("userData");
        var userslist = [];

        e.preventDefault();
        let errors = this.validateLoginForm();
        if (errors === true) {
            this.setState({
                errors: errors,
            });

            if (userData != null) {
                userslist = JSON.parse(userData);
            }

            // check user already exists or not
            let userExist = this.userExists(userslist, this.state.formData.email);

            if (userExist) {
                this.setState({
                    errors: { email: "User Already Exists" },
                });
            } else {

                delete this.state.formData["cpassword"];

                userslist.push(this.state.formData);

                localStorage.setItem("userData", JSON.stringify(userslist));
                this.props.history.push('/signin');

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
                                                    <FormGroup controlId="fname" validationState={formSubmitted ? (errors.fname ? 'error' : 'success') : null}>
                                                        <FormLabel>Full Name</FormLabel>
                                                        <FormControl type="text" name="fname" placeholder="Enter your full name" onChange={this.handleInputChange} />
                                                        {errors.fname &&
                                                            <span className="error-msg">{errors.fname}</span>
                                                        }
                                                    </FormGroup>
                                                </div>


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

                                                <div className="mt-3 input-border-radius">
                                                    <FormGroup controlId="cpassword" validationState={formSubmitted ? (errors.cpassword ? 'error' : 'success') : null}>
                                                        <FormLabel>Confirm Password</FormLabel>
                                                        <FormControl type="password" name="cpassword" placeholder="Enter your confirm password" onChange={this.handleInputChange} />
                                                        {errors.cpassword &&
                                                            <span className="error-msg">{errors.cpassword}</span>
                                                        }
                                                    </FormGroup>
                                                </div>



                                                <div className="d-grid mt-4">
                                                    <button className="input-border-radius btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Sign Up</button>
                                                    <div className="text-center">
                                                        <a className="small" href="/signin">SignIn</a>
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