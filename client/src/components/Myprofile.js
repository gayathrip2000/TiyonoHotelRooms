import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Tag, Button, Space } from 'antd';

function Myprofile() {

    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {

        if (!user) {
            window.location.href = "/login";
        }


    }, [])

    async function deleteaccount(_id) {

        try {

            const data = await (await axios.patch('/api/users/deleteuser', { _id })).data


        } catch (error) {
            console.log(error)

        }

    }

    return (
        <div>

            <div className='row'>
                <div className="col-md-6">
                    <p>My Profile</p>

                    <br></br>
                    <div className='bs'>
                        <p><b>Name :</b> {user.name}</p>

                        <p><b>Email :</b> {user.email}</p>

                        <p> <b>IsAdmin : </b>{user.isAdmin ? <Tag color="red"><b>YES</b></Tag> : <Tag color="geekblue"><b>NO</b></Tag>}</p>


                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className='btn' onClick={() => {

                                Swal.fire({
                                    title: 'Are you sure?',
                                    text: "You want to delete this account",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: 'darkgreen',
                                    cancelButtonColor: 'darkred',
                                    confirmButtonText: 'Your account deleted!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        { deleteaccount(user._id) }
                                        Swal.fire(
                                            'Deleted!',
                                            'Your account has been deleted.',
                                            'success'
                                        ).then(result => {
                                            localStorage.clear();
                                            window.location.href = '/'
                                        })
                                    }
                                })


                            }}>Delete Account</button>
                        </div>


                    </div>
                </div>

            </div>



        </div>
    )
}

export default Myprofile



//how to connect mongodb node js ?

