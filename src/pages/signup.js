import { useRef, useState } from "react"
import "../styles/signup.css"
import { useIndexedDB } from "react-indexed-db-hook";
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const navigate = useNavigate()
    const { add, getAll } = useIndexedDB("users");
    const { login } = useAuth()
    const loginForm = useRef(null)
    const handleInputChange = (event) => {
        const target = event.target;
        let value = event.target.value;
        const name = target.name;

        if (target.name === "password") {
            document.getElementById(name).type = "password";
            value = event.target.value;
        }
    }

    const addData = async () => {
        const form = loginForm.current
        console.log(form["username"].value)
        console.log(form["password"].value)
        const userName = form["username"].value
        const passWord = form["password"].value
        const email = form["email"].value


        if (!userName || userName.trim() === "") {
            setSnackMessage("Please enter your username")
            setIsSnackBarOpen(true)
            return
        }
        if (!passWord || passWord.trim() === "") {
            setSnackMessage("Please enter your password")
            setIsSnackBarOpen(true)
            return
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isEmailValid = emailRegex.test(email)
        if (!isEmailValid) {
            setSnackMessage("Invalid email")
            setIsSnackBarOpen(true)
            return
        }
        const date = new Date()
        const fetchedData = await getAll()
        console.log(fetchedData)
        const isUserExists = fetchedData.find(user => user.username === userName)
        console.log(isUserExists)
        if (isUserExists) {
            setSnackMessage("User already exists!")
            setIsSnackBarOpen(true)
            return
        }
        await add({ username: userName, password: passWord, email: email, isBlocked: 0, logins: [date] }).then(
            (event) => {
                setSnackMessage("user created successfully")
                setIsSnackBarOpen(true)
                navigate("/login")
            },
            (error) => {
                setSnackMessage("Something went wrong, please try again")
                setIsSnackBarOpen(true)
            },
        );
    }
    const closeSnackBar = () => setIsSnackBarOpen(false)

    return (
        <div className="container">
            <div className="signup">
                <div className="form-container">
                    <h4>Sign Up</h4>

                    <form onSubmit={addData} ref={loginForm} className="login-form" >
                        <div className="text_area">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                defaultValue=""
                                className="text_input"
                                onChange={handleInputChange}
                                placeholder="username"
                            />
                        </div>
                        <div className="text_area">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="password"
                                className="text_input"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="text_area">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email"
                                className="text_input"
                                onChange={handleInputChange}
                            />
                        </div>

                        <input
                            type="button"
                            onClick={addData}
                            className="btn"
                            value="Sign Up"
                        />
                    </form>
                    <div className="signup-container">
                        <p>Already a member? </p>
                        <a className="link" href="/login">Login</a>
                    </div>
                </div>
            </div>
            <Snackbar
                open={isSnackBarOpen}
                onClose={closeSnackBar}
                message={snackMessage}
            />
        </div>
    )
}

export default Signup