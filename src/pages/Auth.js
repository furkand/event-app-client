import React, {useContext, useState,useRef} from "react"
import {Button, Form, Input, Message} from "semantic-ui-react"
import AuthContext from "../context/auth-context"

const  AuthPage = (props)=>{
    const [errors, setErrors] = useState({})
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    


    const submitHandler = (event) =>{
        event.preventDefault()
        const email = credentials.email[0].trim();
        const password = credentials.password[0].trim();
        if(email.length===0 || password.length===0){
            return;
        }

        const requestBody = {
            query: `
                mutation{
                    createUser(userInput: {email: "${email}",password: "${password}"}){
                        _id
                        email
                    }
                }
            `
        }
        fetch("https://furkan-event-app.herokuapp.com/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers:{
                "Content-Type" : "application/json"
            }
        }).then(res=>{
                if(res.status !==200 && res.status !==201){
                    setCredentials({
                        email: "",
                        password: ""
                    })
                    throw new Error("upss something went wrong while fetching data")
                } 
                return res.json();

            }
        )
        .then(res=>{
           console.log(res.data)
                
            }
        )
        .catch(err=>{
            console.log(err);
            
        })
    }
    const onChange = (event) =>{
        setCredentials({
            ...credentials,[event.target.name] : [event.target.value]
        })
        console.log( "target name : " + [event.target.name] + " target value:  " + [event.target.value])

    }
    
    return (
        <div className="authentication-page" style={{width:30 + "%", margin: "auto", marginTop:50 + "px"}}>
            <Form onSubmit={submitHandler}>
                <Form.Field
                    onChange={onChange}
                    id='form-input-control-error-email'
                    control={Input}
                    label='Email'
                    name="email"
                    value={credentials.email}
                    placeholder='joe@schmoe.com'



                   
                 />
                 <Form.Field
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
        </div>
    )
}

export default AuthPage;