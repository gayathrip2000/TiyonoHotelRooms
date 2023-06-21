import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({

});

function Bookingscreen({ match }) {


    let params = useParams();

    const [room, setroom] = useState();
    const [totalamount, settotalamount] = useState(0);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();


    const roomid = params.roomid;

    const fromdate = moment(params.fromdate, "DD-MM-YYYY")
    const todate = moment(params.todate, "DD-MM-YYYY")

    const totaldays = moment.duration(todate.diff(fromdate)).asDays()

    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {

        const fetchData = async () => {

            if(!localStorage.getItem('currentUser')){
                window.location.reload ='/login'
            }


            try {
                setloading(true);
                const data = (await axios.post("/api/rooms/getroombyid", { roomid: params.roomid })).data
                setroom(data.room)
                settotalamount(totaldays * data.room.rentperday);
                setloading(false);

            } catch (error) {

                seterror(true)
                setloading(false);
            }

        };
        fetchData();
    }, [totaldays]);

 
    async function onToken(token) {
        console.log(token);

        const bookingDetails = {
            room,
            userid: user._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }

        try {
            setloading(true);
            const result = await axios.post("/api/bookings/bookroom", bookingDetails)
            setloading(false);
            Swal.fire('Congratulations', 'Your Room Booked Succesfully', 'success').then(result => {

                window.location.href = "/profile"

            })

        } catch (error) {
            setloading(false);
            Swal.fire('OOPS', 'Something went wrong', 'error')

        }


    }
    return (
        <div className='m-5' data-aos='flip-up'>
            {loading ? <Loader /> : room ? (<div>

                <div className='row justify-content-center mt-5 bs'>

                    <div className='col-md-5'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>

                    <div className='col-md-5' >
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Booking Details</h1>
                                <hr></hr>


                                <p>Name : {user.name} </p>
                                <p>From Date :{params.fromdate}</p>
                                <p>To Date :{params.todate}</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr></hr>
                                <p>Total days :{totaldays}</p>
                                <p>Rent per day :{room.rentperday}</p>
                                <p>Total amount : {totalamount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>


                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency='LKR'
                                stripeKey="pk_test_51MRKt4ExB5xuiBM6MKS1ksIbadtIUcKDnEDxoOM7kYjAGhsRAPR8PiLdJc0lNOix6u7G8ZPGmmaeWs5QVy3HT08v003yZGm95q"
                            >


                                <button className='btn'>Pay Now {" "}</button>

                            </StripeCheckout>
                        </div>
                    </div>

                </div>

            </div>) : (<Error />)}

        </div>
    )
}

export default Bookingscreen





