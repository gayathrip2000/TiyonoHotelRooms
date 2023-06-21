import React, { useEffect, useState } from 'react'
import { Tabs, Radio } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Divider, Tag } from 'antd';





function Bookings() {

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()


    useEffect(() => {

        (async () => {


            try {

                const data = await (await axios.get('/api/bookings/getallbookings')).data
                setbookings(data)
                setloading(false)

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }

        })();
    }, [])


    return (

        <div className="row">

            <div className="col-md-12">


                <h1>Bookings</h1>

                {loading && (<Loader />)}

                <table className='table table-bordered'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && (bookings.map(booking => {

                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>  {booking.status === 'cancelled' ? (<Tag color="magenta"><b>Canceled</b></Tag>) : <Tag color="cyan"><b>Confirmed</b></Tag>}</td>


                            </tr>


                        }))}
                    </tbody>
                </table>
            </div>

        </div>

    )

}

export default Bookings
