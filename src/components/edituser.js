import { useRef } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import Snackbar from '@mui/material/Snackbar';
const EditUser = ({ userData, refetchData }) => {
    const { update } = useIndexedDB("users");
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

    const updateData = () => {
        const form = loginForm.current
        console.log(form["username"].value)
        console.log(form["password"].value)
        const userName = form["username"].value
        const passWord = form["password"].value
        const email = form["email"].value
        const date = new Date()
        update({ id: userData.id, username: userName, password: passWord, email: email, isBlocked: 0, logins: [date] }).then(
            (event) => {
                console.log("ID Generated: ", event);
            },
            (error) => {
                console.log(error);
            },
        );
        refetchData()
    }
    return (
        <div >
            <form onSubmit={updateData} ref={loginForm} className="login-form" >
                <div className="text_area">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={userData.username}
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
                        defaultValue={userData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="text_area">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="email"
                        defaultValue={userData.email}
                        className="text_input"
                        onChange={handleInputChange}
                    />
                </div>

                <input
                    type="button"
                    onClick={updateData}
                    className="btn"
                    value="Update"
                />
            </form>
           
        </div>

    )
}

export default EditUser