import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import Swal from 'sweetalert2';
import validator from 'password-validator';



function Registerscreen() {

  const [name, setname] = useState()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
  const [loading, setloading] = useState(false) //variables 
  const [error, seterror] = useState()
  const [success, setsuccess] = useState('')


  async function register() {


    const passwordSchema = new validator(); //check password is strong or not
    passwordSchema
      .is().min(8)                     //minimum length 8   characters             
      .is().max(100)                   //maximum length 100 characters            
      .has().uppercase()               //must have uppercase letters             
      .has().lowercase()               //must have lowercase letters           
      .has().digits()                  //must have digits       
      .has().not().spaces()            //should not have spaces       


    if (!passwordSchema.validate(password)) {
      Swal.fire(
        'Oops!',
        ' Password is not strong',
        'error'
      )
      return;
    }



    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword
      }
      try {
        setloading(true)
        const result = await (await axios.post('api/users/register', user)).data
        setloading(false)
        setsuccess(true)

        setname('')
        setemail('')
        setpassword('')  //after getting successful registration input fields are getting empty
        setcpassword('')

      } catch (error) {
        console.log(error)
        setloading(false)
        seterror(true)
      }
    }

    else {
      //alert("Password not match");
      Swal.fire(
        'Oops!',
        'Password not match',
        'error'
      )
    }

  }

  return (

    <div>

      {loading && (<Loader />)}
      {error && (<Error />)}


      <div className="row justify-content-center mt-5">

        <div className='col-md-5 mt-5'>
          {success && (<Success message="Registration is successfull" />)}


          <div className='bs'>
            <h2>Register</h2>

            <input type="text" className="form-control" placeholder="name"
              value={name} onChange={(e) => { setname(e.target.value) }} />

            <input type="text" className="form-control" placeholder="email"
              value={email} onChange={(e) => { setemail(e.target.value) }} />

            <input type="text" className="form-control" placeholder="password"
              value={password} onChange={(e) => { setpassword(e.target.value) }} />

            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword} // Update the value to cpassword instead of password
              onChange={(e) => { setcpassword(e.target.value) }}
            />

            <button className='btn mt-3' onClick={register}>Register</button>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Registerscreen