import React from "react";
import "../design.css";

const SongCard = ({ song }) => {
  return (
    <>
      <div className="no-touch">
        <div className="box">
          <div className="boxInner">
            <img src={`${song?.image_url}`} alt="img" />
            <div className="titleBox">
              {`${song?.title}`} <br />
              <br />
              {`${song?.artist}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongCard;
