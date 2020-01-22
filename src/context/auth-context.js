import {createReact, createContext} from "react"

const userContext = createContext({
    token: null,
    userId:null,
    login: ()=>{

    },
    logout: ()=>{

    }
})

export default userContext;