import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Tag, Button, Space } from 'antd';


function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentUser'))

    const [bookings, setbookings] = useState();
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        (async () => {


            setloading(true);
            try {
                const data = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data
                console.log(data)
                setbookings(data);
                setloading(false);


            } catch (error) {
                console.log(error)
                setloading(true);


            }
        })();
    }, []);

    async function cancelBooking(bookingid, roomid) {

        try {

            setloading(true)
            const result = await axios.post("/api/bookings/cancelbooking", { bookingid, roomid }).defaultActiveKey
            console.log(result)
            setloading(false)
            Swal.fire('Congratulations', ' Your booking has been cancelled', 'success').then(result => {

                window.location.reload();

            })

        } catch (error) {
            console.log(error);
            setloading(false);
            Swal.fire('Oops', ' Something went wrong', 'error');
        }

    }

    return (

        <div>
            
            <div className='row'>
            <div className="col-md-8">
           

                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
    
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p> <b>Booking id :</b> {booking._id}</p>
                            <p><b>CheckIn :</b> {booking.fromdate}</p>
                            <p><b>CheckOut :</b> {booking.todate}</p>
                            <p><b>Amount :</b> {booking.totalamount}</p>
                            <p><b>Status : </b>{""}

                                {booking.status === 'cancelled' ? (<Tag color="magenta"><b>Canceled</b></Tag>) : <Tag color="cyan"><b>Confirmed</b></Tag>}</p>

                            {booking.status !== 'cancelled' && (
                                <div className='text-right'>

                                    <Space wrap>
                                        <Button className="mybookingbtn" type="primary" danger onClick={() => { cancelBooking(booking._id, booking.roomid) }}>
                                            <b>Cancel Booking</b>
                                        </Button>
                                    </Space>

                                </div>
                            )}
                        </div>

                    }))}

                    </div>
                </div>

        </div>
    )
}

export default MyBookings

