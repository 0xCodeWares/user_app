import { useState, useEffect, useRef } from "react";
import UserTable from "../components/usertable"
import { Modal } from 'react-responsive-modal';
import { useIndexedDB } from "react-indexed-db-hook";
import EditUser from "../components/edituser";
import Snackbar from '@mui/material/Snackbar';
import DeletePopup from "../components/delete";
import { useAuth } from "../hooks/useAuth";
import Logout from "../assets/logout.svg"
const UserList = () => {
    const { getAll, add, deleteRecord, update } = useIndexedDB("users");
    const { logout } = useAuth()
    console.log(getAll)
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [userList, setUserList] = useState([])
    const [editData, seteditData] = useState([])
    const fetchData = async () => {
        try {
            const fetchedData = await getAll()
            if (fetchedData.length === 0) {
                logout()
            }
            setUserList(fetchedData)
            console.log(fetchedData)
        } catch (error) {
            setSnackMessage("something went wrong!, please retry")
            setIsSnackBarOpen(true)

        }
    }

    const DeleteUser = async (data) => {
        seteditData(data)
        try {
            await deleteRecord(editData.id)
            setIsDeletePopupOpen(false)
            refetchData()
        } catch (error) {
            setSnackMessage("something went wrong!, please retry")
            setIsSnackBarOpen(true)
            setIsDeletePopupOpen(false)
        }
    }

    const onOpenModal = (data) => {
        seteditData(data)
        setIsModalOpen(true);

    }
    const onCloseModal = () => setIsModalOpen(false);
    const closeSnackBar = () => setIsSnackBarOpen(false)
    const openSnackBar = () => setIsSnackBarOpen(true)
    const openDeletePopup = (data) => {
        seteditData(data)
        setIsDeletePopupOpen(true)
    }
    const closeDeletePopup = (data) => {
        setIsDeletePopupOpen(false)
    }
    const refetchData = async () => {
        try {
            await fetchData()
            setIsModalOpen(false)
            setIsSnackBarOpen(true)
            setSnackMessage("User Data Updated successfully")

        } catch (error) {
            setIsSnackBarOpen(true)

            setSnackMessage("User data update failed, please try again")

        }

    }
    const blockUser = async (data) => {
        update({ id: data.id, username: data.username, password: data.password, email: data.email, isBlocked:data.isBlocked===0? 1:0, logins: data.logins }).then(
            (event) => {
                fetchData()
            },
            (error) => {
                console.log(error);
                setIsSnackBarOpen(true)

                setSnackMessage("User blocking failed, please try again")
            },
        );
    }
    const logoutUser = () => logout()
    useEffect(() => { fetchData() }, [])

    return (
        <div >
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <img src={Logout} onClick={logoutUser} style={{ marginRight: "10%", }} />
            </div>
            <UserTable tableData={userList} openModal={onOpenModal} openDeletePopup={openDeletePopup} openBlockUser={blockUser} />
            <Modal open={isModalOpen} onClose={onCloseModal} center>
                <h2>Edit</h2>
                <EditUser userData={editData} refetchData={refetchData} />
            </Modal>
            <Modal open={isDeletePopupOpen} onClose={closeDeletePopup} center>
                <h2 style={{ textAlign: 'center' }}>Delete User</h2>
                <DeletePopup deleteUser={DeleteUser} cancelDelete={closeDeletePopup} />
            </Modal>
            <Snackbar
                open={isSnackBarOpen}
                onClose={closeSnackBar}
                message={snackMessage}
            />
        </div>
    )
}
export default UserList