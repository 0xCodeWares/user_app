import "../styles/table.css"
import Edit from "../assets/edit.svg"
import Delete from "../assets/delete.svg"
import Block from "../assets/block.svg"
export default function UserTable({tableData, openModal, openDeletePopup,openBlockUser}) {
   

    return (
        <div className="table-outer-container">
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Previous Logins</th>
                        <th>isBlocked</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <span className="cell-header">User Name:</span> {user.username}
                            </td>
                            <td>
                                <span className="cell-header">Password:</span> {user.password}

                            </td>
                            <td>
                                <span className="cell-header">Email:</span> {user.email}

                            </td>
                            <td>
                                <span className="cell-header">Previous Logins: </span>
                                {
                                    user.logins.map((loginTime) => (
                                        <div key={loginTime.toLocaleString()}> {loginTime.toLocaleString({})}</div>))
                                }
                            </td>
                            <td>
                                <span className="cell-header">isBlocked: </span>
                                
                                        <div> {user.isBlocked?"Blocked":"Not Blocked"}</div>
                            </td>
                            <td>
                                <span className="cell-header"> </span>
                                <div className="btns-container">
                                    <img src={Edit} onClick={()=>openModal(user)}/>
                                    <img src={Delete} onClick={()=>openDeletePopup(user)}/>
                                    <img src={Block} onClick={()=>openBlockUser(user)}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}