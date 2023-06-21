import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from "axios";
import Swal from 'sweetalert2';
import MyBookings from '../components/MyBookings';
import Myprofile from '../components/Myprofile';



const { TabPane } = Tabs;


function Profilescreen() {



    return (
        <div className='ml-4 mt-3'>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Profile" key="1">
                            <Myprofile />
                        </TabPane>
                        <TabPane tab="Bookings" key="2">
                            <MyBookings />
                        </TabPane>

                    </Tabs>
                </div>


    )
}


export default Profilescreen;


