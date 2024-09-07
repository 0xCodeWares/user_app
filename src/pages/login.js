import { useContext, useRef, useState } from "react"
import "../styles/login.css"
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from "../hooks/useAuth";
import { useIndexedDB } from "react-indexed-db-hook";

const Login = () => {
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const loginForm = useRef(null)
    const {login} = useAuth()
    const { getAll,update  } = useIndexedDB("users");

    const handleInputChange = (event) => {
        const target = event.target;
        let value = event.target.value;
        const name = target.name;

        if (target.name === "password") {
            document.getElementById(name).type = "password";
            value = event.target.value;
        }
    }

    const validateUser = async() => {
        const form = loginForm.current
        console.log(form["username"].value)
        console.log(form["password"].value)
        const username = form["username"].value
        const password = form["password"].value
        if(!username || username.trim() === ""){
            setSnackMessage("Please enter your username")
            setIsSnackBarOpen(true)
            return
        }
        if(!password || password.trim() === ""){
            setSnackMessage("Please enter your password")
            setIsSnackBarOpen(true)
            return
        }
        try {
            const fetchedData = await getAll()
            console.log(fetchedData)
            const isUserExists = fetchedData.find(user => user.username === username)
            console.log(isUserExists)
            if(isUserExists){
                const isPasswordCorrect = fetchedData.find(user => user.password === password)
                if(isPasswordCorrect){
                    const isBlocked = isUserExists.isBlocked !== 0
                    if(isBlocked){
                        setSnackMessage("user is blocked!")
                    setIsSnackBarOpen(true) 
                        return
                    }
                    const date = new Date()
                    const addDate = isUserExists.logins
                    addDate.push(date)
                    await update({ id: isUserExists.id, username: username, password: password, email: isUserExists.email, isBlocked:isUserExists.isBlocked, logins: addDate }).then(
                        (event) => {
                            // console.log("ID Generated: ", event);
                        },
                        (error) => {
                            // console.log(error);
                        },
                    );
                    login(true)

                }
                else{
                    setSnackMessage("wrong password!, please retry")
                    setIsSnackBarOpen(true)  
                }
            }
            else{
                setSnackMessage("user doesn't exist")
                    setIsSnackBarOpen(true) 
            }

        } catch (error) {
            setSnackMessage("something went wrong!, please retry")
            setIsSnackBarOpen(true)
        }
    }
    const closeSnackBar = () => setIsSnackBarOpen(false)

    return (
        <div className="container">
            <div className="login">
                <div className="form-container">
                <h4>Login</h4>

                    <form onSubmit={validateUser} ref={loginForm} className="login-form" >
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
                        <input
                            type="button"
                            onClick={validateUser}
                            className="btn"
                            value="Sign In"
                        />
                    </form>
                    <div className="signup-container">
                        <p>Not a member? </p>
                        <a className="link" href="/signup">Sign Up</a>
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

export default Login