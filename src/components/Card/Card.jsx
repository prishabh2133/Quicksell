import React from "react";
import "./Card.css";
import userImage from './userimg.jpeg';
import priority0Image from '../../assets/No-priority.svg';
import priority1Image from '../../assets/Img - Low Priority.svg';
import priority2Image from '../../assets/Img - Medium Priority.svg';
import priority3Image from '../../assets/Img - High Priority.svg';
import priority4Image from '../../assets/SVG - Urgent Priority colour.svg';

import backlogImage from '../../assets/Backlog.svg';
import todoImage from '../../assets/To-do.svg';
import inProgressImage from '../../assets/in-progress.svg';
import doneImage from '../../assets/Done.svg';

const Card = ({ id, title, tag, status, priority }) => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done'];

  const getStatusIndex = (status) => {
    return statusOrder.indexOf(status);
  };

  // Map priority levels to images
  const priorityImages = {
    0: priority0Image,
    1: priority1Image,
    2: priority2Image,
    3: priority3Image,
    4: priority4Image,
  };

  // Map status values to images
  const statusImages = {
    "Backlog": backlogImage,
    "Todo": todoImage,
    "In progress": inProgressImage,
    "Done": doneImage,
  };

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        <div
          className="imageContainer relative"
          style={{ width: "30px", height: "30px" }}
        >
          <img
            style={{ width: "95%", height: "95%", borderRadius: "50%" }}
            src={userImage}
            alt="UserImage"
          />
          <div className="showStatus"></div>
        </div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        {!isStatus && statusImages[status] && (
          <img
            src={statusImages[status]}
            alt={`${status} status`}
            style={{ width: "14px", height: "14px", marginRight: "5px" }}
          />
        )}
        <span style={{ margin: "0.2px" }}>{title}</span>
      </div>
      <div className="cardTags">
        {!isPriority && (
          <div className="tags color-grey">
            <img 
              src={priorityImages[priority]} 
              alt={`Priority level ${priority}`} 
              style={{ width: "20px", height: "20px" }} 
            />
          </div>
        )}
        {tag?.map((element, index) => {
          return (
            <div key={index} className="tags color-grey">
              <span>•</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
