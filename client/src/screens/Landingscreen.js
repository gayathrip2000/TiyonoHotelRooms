import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { duration } from 'moment';
AOS.init({
  duration: 2000,
});

function Landingscreen() {
  return (
    <div className="row landing" data-aos="zoom-out" data-aos-duration="1100">
      <div className="col-md-12 text-center mt-5 ">
        <h2
          data-aos="zoom-in"
          data-aos-duration="1200"
          style={{
            color: "white",
            fontSize: "130px",
            fontWeight: "normal",
            fontFamily: "cursive",
          }}
        >
          Tiyono Rooms
        </h2>

        <h3 data-aos="zoom-out">
          <b>There is only one boss.The Guest.</b>
        </h3>

        <Link to="/home">
          <button className="btn landingbtn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
