import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { Tag } from 'antd';
import Swal from 'sweetalert2';



function Roomdetails() {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()


    useEffect(() => {

        (async () => {


            try {
                setloading(true);
                const data = await (await axios.get('/api/rooms/getaddminallrooms')).data
                setrooms(data)
                setloading(false)

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }

        })();
    }, [])

    async function deleteroom(_id) {

        try {

            setloading(true);
            const data = await (await axios.patch('/api/rooms/deleteroom', { _id })).data
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)

        }


    }

    async function updateroomdetails() {




    }


    return (


        <div>

            <div className="row">

                <div className="col-md-12">


                    <h1>Rooms</h1>

                    {loading && (<Loader />)}

                    <table className='table table-bordered'>
                        <thead className='bs'>
                            <tr>
                                <th>Room Id</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Rent Per Day</th>
                                <th>Max Count</th>
                                <th>Phone number</th>
                                <th>Delete</th>
                                {/* <th>Edit Details</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {rooms.length && (rooms.map(rooms => {

                                return <tr>
                                    <td>{rooms._id}</td>
                                    <td>{rooms.name}</td>
                                    <td>{rooms.type}</td>
                                    <td>{rooms.rentperday}</td>
                                    <td>{rooms.maxcount}</td>
                                    <td>{rooms.phonenumber}</td>

                                    <td><Tag color="red" className='deletebtn' onClick={() => {
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, delete it!'
                                        }).then((result) => {
                                            deleteroom(rooms._id)
                                            if (result.isConfirmed) {

                                                Swal.fire(
                                                    'Deleted!',
                                                    'Your file has been deleted.',
                                                    'success'
                                                ).then(result => {
                                                    window.location.reload();
                                                })

                                            }

                                        })

                                    }}><b>DELETE</b></Tag></td>


                                    {/* <td>
                                        <Link to="/admin/updateroom">
                                            <Tag color="darkgreen" onClick={() => {
                                                updateroomdetails()

                                            }}><b>EDIT</b></Tag>
                                        </Link>
                                    </td> */}

                                </tr>

                            }))}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Roomdetails
