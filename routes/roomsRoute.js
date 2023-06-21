const express = require("express");

const router = express.Router();

const Room = require("../models/room");



router.get("/getallrooms", async (req, res) => {


    try {
        const rooms = await Room.find({})
        return res.json({ rooms })
    } catch (error) {
        return res.status(400).json({ message: error })
    }

});



router.post("/getroombyid", async (req, res) => {

    const roomid = req.body.roomid;

    try {
        const room = await Room.findOne({ _id: roomid })
        return res.json({ room })
    } catch (error) {
        return res.status(400).json({ message: error })
    }

})


router.get('/getaddminallrooms', async (req, res) => {

    try {

        const rooms = await Room.find()
        res.send(rooms)

    } catch (error) {

        return res.status(400).json({ error })


    }

})


router.post("/addroom", async (req, res) => {

    try {
        const newroom = new Room(req.body)
        await newroom.save()

        res.send("New Room Added Successfully")
    } catch (error) {
        return res.status(400).json({ error })
    }


})

router.patch("/deleteroom", async (req, res) => {

    const { _id } = req.body;

    try {
        const room = await Room.findByIdAndDelete(_id)


        if (!room) return res.status(404).send('Room not found');
        res.send('Room deleted successfully');


    } catch (error) {
        return res.status(400).json({ error })


    }
})





module.exports = router;