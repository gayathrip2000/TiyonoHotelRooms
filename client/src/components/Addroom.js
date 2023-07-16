import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Form, Input, Button, Space, Radio } from 'antd';
import Swal from 'sweetalert2';


const { TextArea } = Input;

function Addroom() {


    const [name, setname] = useState();
    const [rentperday, setrentperday] = useState();
    const [description, setdescription] = useState();

    const [maxcount, setmaxcount] = useState();
    const [phonenumber, setphonenumber] = useState();
    const [type, settype] = useState();

    const [imageurl1, setimageurl1] = useState();
    const [imageurl2, setimageurl2] = useState();
    const [imageurl3, setimageurl3] = useState();

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();



    async function addRoom() {


        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]

        }
        try {
            setloading(true);
            const result = await (await axios.post("api/rooms/addroom", newroom)).data
            console.log(result);
            setloading(false);
            Swal.fire("Congratulations", "Your New Room Added Successfully", "success").then(result => {
                window.location.href = '/home'
            })
        } catch (error) {

            console.log(error)
            setloading(false);
            Swal.fire("Oops", "Please fill required fields", "error")

        }
    }

    return (


        <div className='row'>
            <div className='col-md-5'>

                {loading && (<Loader />)}
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                    layout="horizontal"

                >

                    <Form.Item label="Room name" required value={name} onChange={(e) => { setname(e.target.value) }}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Rent Per Day" required value={rentperday} onChange={(e) => { setrentperday(e.target.value) }}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Max count" required value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Phone number" required value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" required value={description} onChange={(e) => { setdescription(e.target.value) }}>
                        <TextArea rows={4} />
                    </Form.Item> 

                </Form>


            </div>


            <div className='col-md-5'>



                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                    layout="horizontal"
                >



                    <Form.Item label="Type" required>
                        <Radio.Group value={type} onChange={(e) => { settype(e.target.value) }}>
                            <Radio value="non-dulex">Non-Dulex</Radio>
                            <Radio value="dulex">Dulex</Radio>
                        </Radio.Group>
                    </Form.Item>


                    <Form.Item label="Image url 1" required value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Image url 2" required value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Image url 3" required value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }}>
                        <Input />
                    </Form.Item>


                    <Button type="primary" onClick={addRoom}>Add Room</Button>



                </Form>


            </div>
        </div>



    )
}

export default Addroom