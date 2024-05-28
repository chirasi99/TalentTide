import React , { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

        const [firstname, setFirstname] = useState('')
        const [lastname, setLastname] = useState('')
        const [email, setEmail] = useState('')

        const [errors, setErrors] = useState({
             firstname:'',
             lastname:'',
             email:''   
        })

        const { id } = useParams();
        const navigator = useNavigate();

        useEffect(() => {
                if(id){
                        getEmployee(id).then((response)=> {
                                setFirstname(response.data.firstname);
                                setLastname(response.data.lastname);
                                setEmail(response.data.email);
                        }).catch(error =>{
                                console.error(error);
                        })
                        
                }
        },[id])

        function handleFirstname(event){
                setFirstname(event.target.value)
        }

        function handleLastname(event){
                setLastname(event.target.value)
        }

        function handleEmail(event){
                setEmail(event.target.value)
        }

        function saveEmployee(event){
                event.preventDefault();
                if(validateForm()){
                        let employee = {firstname, lastname, email}
                        console.log('employee => ' + JSON.stringify(employee))

                        if(id){
                                updateEmployee(id,employee).then((response) =>{
                                        console.log(response.data);
                                        navigator('/employees');
                                }).catch(error =>{
                                        console.error(error);
                                })
                        }else{
                                createEmployee(employee).then((response) => {
                                        console.log(response.data);
                                        navigator('/employees')
                                }).catch(error =>{
                                        console.error(error);
                                })
                        }     
                }        
        }

        function validateForm(){
                let valid = true;
                const errorsCopy = {... errors}
                if(firstname.trim()){
                        errorsCopy.firstname = '';
                }else{
                    errorsCopy.firstname ='First name is required';
                    valid = false;    
                }
                if(lastname.trim()){
                        errorsCopy.lastname = '';
                }else{
                    errorsCopy.lastname ='Last name is required';
                    valid = false;    
                }
                if(email.trim()){
                        errorsCopy.email = '';
                }else{
                    errorsCopy.email = 'Email is required';
                    valid = false;    
                }

                setErrors(errorsCopy);

                return valid;
        }

        function pageTitle(){
                if(id){
                        return  <h2 className='text-center mt-3'>Update Employee</h2>
                }else{
                        return  <h2 className='text-center mt-3'>Add Employee</h2>
                }
        }
  return (
    <div>
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className='form-label'>First Name:</label>
                                <input placeholder="First Name" 
                                name="firstName" 
                                className={`form-control ${ errors.firstname ? 'is-invalid': '' }`}
                                value={firstname} 
                                onChange={handleFirstname}/>
                                {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label'>Last Name:</label>
                                <input placeholder="Last Name"
                                 name="lastName" 
                                 className={`form-control ${ errors.lastname ? 'is-invalid': '' }`}
                                 value={lastname} 
                                 onChange={handleLastname}/>
                                 {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label'>Email:</label>
                                <input placeholder="Email Address" 
                                name="emailId" 
                                className={`form-control ${ errors.email ? 'is-invalid': '' }`}
                                value={email} 
                                onChange={handleEmail}/>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <button className="btn btn-success mt-4" type="submit" onClick={saveEmployee}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
            
            </div>
    </div>
  )
}

export default EmployeeComponent