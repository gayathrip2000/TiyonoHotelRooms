import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import { Divider, Tag, Button, Space } from 'antd';



function Users() {

    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()



    useEffect(() => {

        (async () => {


            try {

                const data = await (await axios.get('/api/users/getallusers')).data
                setusers(data)
                setloading(false)

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }

        })();
    }, [])

    return (

        <div className='row'>

            <div className='col-md-12'>

                <h1>Users</h1>

                {loading && (<Loader />)}
                <table className='table table-bordered'>

                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>


                    <tbody>

                        {users && (users.map(user =>{

                                    return <tr>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? <Tag color="red"><b>YES</b></Tag> : <Tag color="geekblue"><b>NO</b></Tag> }</td>
                                    </tr>

                        }))}


                    </tbody>

                </table>

            </div>

        </div>

            )


}

export default Users