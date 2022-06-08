import React from 'react'
import {useState, useEffect} from "react"
import './InfiniteScroll.css'

function InfiniteScroll() {

const [page, setPage] = useState(1)
const [user, setUser] = useState([])
const [loading, setLoading] = useState(true)


const handleScroll= (event)=>{
    const [scrollTop, scrollHeight, clientHeight] = event.currentTarget
    
    console.log("scroll" , scrollHeight)
    console.log(scrollTop)
    console.log(clientHeight)

    if(scrollHeight-scrollTop== clientHeight){
        setPage(prev => prev +1)
    }
}


useEffect(() =>{
    getallData()
},[page])


const getallData= async() =>{

    const loadusers= await fetch(`https://randomuser.me/api/?page=${page}&results=5`);
    
    setLoading(true)
    const newusers= await loadusers.json();
    console.log(newusers);

    const news= newusers.results
    console.log("new", news)

    setUser((prev)=>{
        return [...prev, ...news]
    })
    setLoading(false)
}

    return (
    <div  className="container">

<div onScroll={handleScroll}>   
{user && user.map((elem)=>{
    return <div key={elem.email}>  {elem.email}     </div>
})}

</div>

{loading &&   <div> Loading.......  </div>}

    </div>
  )
}

export default InfiniteScroll
