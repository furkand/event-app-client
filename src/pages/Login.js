import React, {useContext, useState,useRef} from "react"
import {Button, Form, Input, Message} from "semantic-ui-react"

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
                query{
                    login(email: "${email}",password: "${password}"){
                        token
                        userId
                        tokenExpiration
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
                    console.log(res.graphQL)
                    throw new Error("upss something went wrong while fetching data")
                } 
                return res.json();

            }
        )
        .then(res=>{
                console.log(res)
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