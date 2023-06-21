import React, { useEffect, useState } from 'react'
import { Tabs, Radio } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Addroom from '../components/Addroom';
import Bookings from '../components/Bookings';
import Users from '../components/Users';
import Roomdetails from '../components/Roomdetails.';

const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() => {

        (async () => {


                if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin){

                    window.location.href ='/home';
                }



        })();
    },[])

    return (
        <div className='mt-4 ml-3  bs'>

            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin panel</b></h2>
            <div className='mt-4'>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Bookings" key="1">
                        <Bookings />
                    </TabPane>
                    <TabPane tab="Rooms" key="2">
                        <Roomdetails />
                    </TabPane>
                    <TabPane tab="Add room" key="3">
                      <Addroom />
                    </TabPane>
                    <TabPane tab="Users" key="4">
                      <Users/>
                    </TabPane>
                </Tabs>
            </div>

        </div>


    )
}

export default Adminscreen



