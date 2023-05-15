import {useEffect, useState} from "react";

export default function Read(){
    const [posts,setPosts]=useState([])
    const [search,setSearch]=useState('')
    const [darkMode,setDarkMode]=useState(false)

    useEffect(( )=>{
        fetch(`http://localhost:5000/posts`)
        .then(res=>res.json())
        .then(data=>()=>{
            if(search===''){
                setPosts(data.data)
            }else{
                //title,content,author
                const filteredData=data.data.filter(post=>(
                    post.title.toLowerCase().includes(search.toLowerCase())||
                    post.content.toLowerCase().includes(search.toLowerCase())||
                    post.author.toLowerCase().includes(search.toLowerCase())
                ))

                setPosts(filteredData)
            }
        })
    },[search])

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