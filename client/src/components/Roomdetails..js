import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { Table, Modal, Form, Input, Tag, notification } from "antd";
import Swal from "sweetalert2";
import { CheckCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;




function Roomdetails() {
  const [open, setOpen] = useState(false);
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [name, setname] = useState();
  const [rentperday, setrentperday] = useState();
  const [description, setdescription] = useState();

  const [maxcount, setmaxcount] = useState();
  const [phonenumber, setphonenumber] = useState();

  const formRef = React.useRef(null);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async() => {
    await editRoom(rooms.id,name,rentperday,description,maxcount,phonenumber);
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  async function editRoom(_id,updatename,updaterentperday,updatedescription,updatemaxcount,updatephonenumber) {}

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const data = await (
          await axios.get("/api/rooms/getaddminallrooms")
        ).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    })();
  }, []);

  async function deleteroom(_id) {
    try {
      setloading(true);
      const data = await (
        await axios.patch("/api/rooms/deleteroom", { _id })
      ).data;
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h1>Rooms</h1>

          {loading && <Loader />}

          <table className="table table-bordered">
            <thead className="bs">
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Count</th>
                <th>Phone number</th>
                <th>Delete</th>
                <th>Edit Details</th>
              </tr>
            </thead>

            <tbody>
              {rooms.length &&
                rooms.map((rooms) => {
                  return (
                    <tr>
                      <td>{rooms._id}</td>
                      <td>{rooms.name}</td>
                      <td>{rooms.type}</td>
                      <td>{rooms.rentperday}</td>
                      <td>{rooms.maxcount}</td>
                      <td>{rooms.phonenumber}</td>

                      <td>
                        <Tag
                          color="red"
                          className="deletebtn"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              deleteroom(rooms._id);
                              if (result.isConfirmed) {
                                Swal.fire(
                                  "Deleted!",
                                  "Your file has been deleted.",
                                  "success"
                                ).then((result) => {
                                  window.location.reload();
                                });
                              }
                            });
                          }}
                        >
                          <b>DELETE</b>
                        </Tag>
                      </td>

                      <td>
                        <Tag color="darkgreen" onClick={showModal}>
                          <b>EDIT</b>
                        </Tag>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Edit room details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        width="1000px"
        className="payment-modal"
        onCancel={handleCancel}
      >
        <Form
          ref={formRef} 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item
            label="Room name"
            required
          
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Rent Per Day"
            required
            
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Max count"
            required
            
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone number"
            required
            
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            required
            
          >
        <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Roomdetails;
