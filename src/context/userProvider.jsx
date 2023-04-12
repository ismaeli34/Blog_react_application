import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import userContext from './userContext'

function UserProvider({children}) {


    const [user,setUser]=useState({
        name:'Ronney'
    })

    useEffect(()=>{

        setUser({
            name:"Ronney Ismael"
        })
    },[])

  return (

    <userContext.Provider  value={user}>
        {children} 
    </userContext.Provider>

  )
}





export default UserProvider


