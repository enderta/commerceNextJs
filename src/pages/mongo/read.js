import {useEffect, useState} from "react";

export default function Read(){
    const [posts,setPosts]=useState([])
    const [search,setSearch]=useState('')
    const [darkMode,setDarkMode]=useState(false)

    //async function
    const get=async()=>{
        const res= await fetch(`http://localhost:3000/api/mongo/mongo`)
        const data=await res.json()
        setPosts(data.data)
    }

    useEffect(()=>{
        get().then(r => console.log(r))
    },[])

    console.log(posts)
    return(
        <div className={darkMode?'dark-mode':'light-mode'}>
            <nav>
                <div className="search">
                    <input type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
                </div>
                <div className="toggle-container">
                    <span style={{color:darkMode?'grey':'yellow'}}>☀︎</span>
                    <span className="toggle">
                        <input type="checkbox" checked={darkMode} onChange={()=>setDarkMode(!darkMode)}/>
                        <span className="slider round"></span>
                    </span>
                    <span style={{color:darkMode?'slateblue':'grey'}}>☾</span>
                </div>
            </nav>
            <div className="content">
                {posts.map(post=>(
                    <div className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>{post.author}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}