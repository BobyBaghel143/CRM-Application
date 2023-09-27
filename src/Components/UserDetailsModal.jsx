import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({ user, resetTable }) {
  const [userDisplay, setUserDisplay] = useState(user);
  
  async function handleUserChange(e) {
    try {
      const ul = e.target.parentNode.parentNode;
      const name = ul.getAttribute("name");
      const dropdown = document.getElementById(`${name}Dropdown`);
      dropdown.open = !dropdown.open;
      toast("Updating the user...");
      const response = await axiosInstance.patch("user/updateUser", {
      userId: userDisplay.id,
      updates: {
        ...userDisplay,
        [name]: e.target.textContent
      }
     }, {
       headers: {
         "x-access-token": localStorage.getItem("token"),
       }
     });
    
    
      if (response?.data?.result) {
        toast.success("Succesfull updated the user"); 
        const user = response?.data?.result;
        setUserDisplay({
          ...userDisplay,
          name: user.name,
          email: user.email,
          userStatus: user.userStatus,
          userType: user.userType,
          clientName: user.clientName,
        });
        resetTable();
      }
    } catch (error) {
      toast.error("Something went worng");
    }

  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="user_details_modal" className="modal">
        <div className="modal-box text-lg font-semibold  ">
          <h2 className="font-bold text-lg ">User Details</h2>
          <p className="py-4"> Name : <span className="text-yellow-500">{userDisplay.name} </span> </p>
          <p className="py-4"> email : <span className="text-yellow-500">{userDisplay.email} </span> </p>
          <p className="py-4"> Status :
            <span className="text-yellow-500">
              <div className="dropdown dropdown-right" id="userStatusDropdown" >
                <label tabIndex={0} className="btn m-1">{userDisplay.userStatus}</label>
                <ul tabIndex={0} name="userStatus" onClick={handleUserChange} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>approved</a></li>
                  <li><a>suspended</a></li>
                  <li><a>rejected</a></li>
                </ul>
              </div>
            </span>
          </p>
          <p className="py-4"> Type :
            <span className="text-yellow-500 ">
              <div className="dropdown dropdown-right" id="userTypeDropdown" >
                <label tabIndex={0} className="btn m-1">{userDisplay.userType}</label>
                <ul tabIndex={0} name="userType" onClick={handleUserChange} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>customer</a></li>
                  <li><a>admin</a></li>
                  <li><a>engineer</a></li>
                </ul>
              </div>
            </span>
          </p>
          <p className="py-4"> clientName : <span className="text-yellow-500">{userDisplay.clientName} </span> </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default UserDetailsModal;
