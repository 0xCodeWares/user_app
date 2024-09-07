import "../styles/delete.css"
const DeletePopup = ({deleteUser, cancelDelete}) => {
    return (
            <div className="form-container">
                <h5>Are you sure you want to delete this user?</h5>
                <div>
                <input
                    type="button"
                    className="cancel-btn"
                    value="Cancel"
                    onClick={cancelDelete}
                />
                <input
                    type="button"
                    className="delete-btn"
                    value="Delete"
                    onClick={deleteUser}
                />
                </div>
                
            </div>
    )
}

export default DeletePopup