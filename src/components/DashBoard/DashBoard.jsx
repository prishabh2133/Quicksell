import React from "react";
import { useSelector } from "react-redux";
import "./DashBoard.css";
import Card from "../Card/Card";
import userImage from "../../assets/userimg.jpeg"; 
import addimg from '../../assets/add.svg'


import backlogImage from "../../assets/Backlog.svg";
import todoImage from "../../assets/To-do.svg";
import inProgressImage from "../../assets/in-progress.svg";
import doneImage from "../../assets/Done.svg";
import canceledImage from "../../assets/Cancelled.svg";


import noPriorityImage from "../../assets/No-priority.svg";
import lowPriorityImage from "../../assets/Img - Low Priority.svg";
import mediumPriorityImage from "../../assets/Img - Medium Priority.svg";
import highPriorityImage from "../../assets/Img - High Priority.svg";
import urgentPriorityImage from "../../assets/SVG - Urgent Priority colour.svg";

const DashBoard = () => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const { selectedData, user } = useSelector((state) => state.SelectDataReducer);

 
  const statusImages = {
    "Backlog": backlogImage,
    "Todo": todoImage,
    "In progress": inProgressImage,
    "Done": doneImage,
    "Canceled": canceledImage,
  };

  
  const priorityImages = {
    "No priority": noPriorityImage,
    "Low": lowPriorityImage,
    "Medium": mediumPriorityImage,
    "High": highPriorityImage,
    "Urgent": urgentPriorityImage,
  };

  return (
    selectedData && (
      <div className="dashContainer" style={{ display: "flex", justifyContent: "space-around" }}>
        {selectedData.map((element, index) => {
          const cardWidthPercentage = 18.7;
          return (
            <div key={index} className="dashCardContainer" style={{ width: `${cardWidthPercentage}%` }}>
              <div className="dashCardHeading flex-sb">
                <div className="leftView">
                  {user ? (
                    <div className="imageContainer relative" style={{ width: "20px", height: "20px", display: "inline-block", marginRight:"0.4rem"}}>
                      <img src={userImage} alt="User" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                    </div>
                  ) : isStatus ? (
                    <div className="cardTitle" style={{ width: "15px", height: "15px", display: "inline-block", fontWeight: 200 }}>
                      <img
                        src={statusImages[element[index].title] || canceledImage}
                        alt={`${element[index].title} status`}
                        style={{ width: "15px", height: "15px" }}
                      />
                    </div>
                  ) : isPriority ? (
                    <div className="tags color-grey" style={{ width: "35px", height: "30px", display: "inline-block" }}>
                      <img
                        src={priorityImages[element[index].title] || noPriorityImage}
                        alt={`${element[index].title} priority`}
                        style={{ width: "24px", height: "24px" }}
                      />
                    </div>
                  ) : (
                    <img src={noPriorityImage} alt="Default" style={{ width: "20px", height: "20px" }} />
                  )}
                  <span>
                    {element[index]?.title} {element[index].value?.length}
                  </span>
                </div>
                <div className="rightView">
                  <img src={addimg} alt="Add" style={{ width: "16px", height: "16px" }} /> {/* Replace with your plus icon image */}
                  <span style={{ letterSpacing: "2px" }}>...</span>
                </div>
              </div>
              <div className="dashList flex-gap-10">
                {element[index]?.value?.map((el, ind) => (
                  <Card
                    key={ind}
                    id={el.id}
                    title={el.title}
                    tag={el.tag}
                    status={el.status}
                    priority={el.priority}
                  />
                ))}
              </div>
            </div>
          );
        })}
        {isStatus && (
          <>
            <div className="dashCardHeading flex-sb">
              <div className="leftView" style={{ fontSize: "15px", marginRight: "90px", wordSpacing: "4px" }}>
                <div className="cardTitle" style={{ width: "13px", height: "13px", display: "inline-block", fontWeight: 200 }}>
                  <img src={doneImage} alt="Done" style={{ width: "13px", height: "13px" }} />
                </div>
                <span style={{ fontSize: "13px", fontWeight: "lighter" }}>Done</span>
                <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                <img src={addimg} alt="Add" style={{ width: "16px", height: "16px" }} /> {/* Replace with your plus icon image */}
                <span style={{ letterSpacing: "2px" }}>...</span>
              </div>
            </div>
            <div className="dashCardHeading flex-sb">
              <div className="leftView" style={{ fontSize: "15px", marginRight: "60px", wordSpacing: "4px" }}>
                <div className="cardTitle" style={{ width: "9px", height: "9px", display: "inline-block", fontWeight: 200 }}>
                  <img src={canceledImage} alt="Canceled" style={{ width: "9px", height: "9px" }} />
                </div>
                <span style={{ fontSize: "13px", fontWeight: "lighter" }}>Canceled</span>
                <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default DashBoard;
