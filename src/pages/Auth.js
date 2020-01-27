import React, {useContext, useState} from "react"
import {Button, Form, Input, Message} from "semantic-ui-react"
import {AuthContext} from "../context/auth-context"
import {emailValidation} from "../handlers/handlers"

const  Signup = (props)=>{
    const [errors, setErrors] = useState([])
    console.log(errors)
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const clearCredentials = () =>{
        setCredentials({
            email: "",
            password: ""
        })
    }

    const userContext = useContext(AuthContext)
    const submitHandler = async (event) =>{
        event.preventDefault()
        setLoading(true)
        const email = credentials.email.trim();
        const password = credentials.password.trim();
        if(email.length===0 || password.length===0){
            const error = {
                error : "Inputs must not be blank!"
            }
            clearCredentials()
            setLoading(false)
            setErrors([error])
            
            return;
        }
        

        const requestBody = {
            query: `
            mutation{
                createUser(userInput: {email: "${email}",password: "${password}"}){
                    _id
                    email
                    token
                }
            }
        `
        }
        try{
            const data = await fetch("https://furkan-event-app.herokuapp.com/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            const prettyData = await data.json()
            if(data.status !==200 && data.status !==201){
                clearCredentials()
                const errorArray = prettyData.errors.map(error=>{
                    return {error: error.message}
                })
                setLoading(false)
                setErrors([...errorArray])
                
                throw new Error("Something went wrong!")
            }
            if(prettyData.data.createUser){
                    console.log(prettyData.data.createUser)
                              userContext.login(
                                prettyData.data.createUser.token, 
                                prettyData.data.createUser.userId
                                  )
                                setLoading(false)
                                console.log("user token after login: " + prettyData.data.createUser.token)
                          }else{
                            const errorArray = prettyData.errors.map(error=>{
                                return {error: error.message}
                            })
                            setLoading(false)
                            setErrors([...errorArray])
                                throw new Error("This email is already taken!")               
                          }
            
        }
        catch(err){
            console.log(err)
            setLoading(false)
        }
        }
    const onChange = (event) =>{
        const preCredentials = {
            ...credentials
        }
        const property = event.target.name
        preCredentials[property] = event.target.value
        setCredentials(
            preCredentials
        )

    }
    const emailValid = emailValidation(credentials.email)
    
    return (
        
        <div className="authentication-page" > 
            <Form className={loading && "loading" }onSubmit={submitHandler}>
                {!emailValid}
                <Form.Input
                    onChange={onChange}
                    id='form-input-control-error-email'
                    control={Input}
                    label='Email'
                    name="email"
                    type="email"
                    value={credentials.email}
                    placeholder='joe@schmoe.com'



                   
                 />
                 <Form.Input
                    onChange={onChange}
                    id='form-input-control-error-password'
                    control={Input}
                    label='Password'
                    type="password"
                    name="password"
                    placeholder=''
                    value={credentials.password}

                   
                 />
              
                <Button type='submit'>Submit</Button>
            </Form>
            {errors.length > 0 && (
                        <div className='ui error message'>
                        <ul className='list'>
                            {errors.map(value=>(
                            <li key={Math.random()}>{value.error}</li>
                            ))}
                        </ul>
                    </div>
                   )}
        </div>
    )
}

export default Signup;