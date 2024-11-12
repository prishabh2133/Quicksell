import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectData } from "../../Actions/DataAction";
import disimg from '../../assets/Display.svg'
import down from '../../assets/down.svg';
import "./NavBar.css";

const NavBar = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);

  // Retrieve initial values from localStorage or default to "status" and "priority"
  const [groupValue, setGroupValue] = useState(
    localStorage.getItem("group") || "status"
  );
  const [orderValue, setOrderValue] = useState(
    localStorage.getItem("order") || "priority"
  );

  // Handle change in Group selection
  const handleGroupValue = (e, isGroup) => {
    const newValue = e.target.value;
    if (isGroup) {
      setGroupValue(newValue);
      localStorage.setItem("group", newValue); // Save to localStorage
    } else {
      setOrderValue(newValue);
      localStorage.setItem("order", newValue); // Save to localStorage
    }
    setDisplayOnClick(false); // Close the dropdown
  };

  // Fetch and set selected data whenever groupValue or orderValue changes
  useEffect(() => {
    if (groupValue === "user") {
      dispatch(
        selectData(
          groupValue,
          {
            allTickets,
            allUser,
          },
          orderValue
        )
      );
    } else {
      dispatch(selectData(groupValue, allTickets, orderValue));
    }
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  return (
    <div className="top-header" style={{ paddingLeft: "13px" }}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn displayButtondiv"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <img src={disimg} alt="Display Icon" />
          Display
          <img src={down} alt="Dropdown Icon" />
        </button>
        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
