import React from 'react'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { duration } from 'moment';
AOS.init({
  duration: 2000,
});

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>

            <div className="col-md-9 my-auto text-center">

                <h2 data-aos='zoom-in'style={{color : 'white',fontSize :'80px'}}>Tiyono Rooms</h2>

                <h3 data-aos='zoom-out'><b>There is only one boss.The Guest.</b></h3>

                <Link to ="/home">
                    <button className = 'btn landingbtn'>Get Started</button>
                </Link>


            </div>


        </div>
  );
}

export default Landingscreen;
