import {connectDb} from "@/pages/db";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function home(){
    const router = useRouter();
   const id= router.query.id;
    const [property, setProperty] = useState({});

    useEffect(
        fetch(`/api/single/${id}`).then(res => res.json()).then(data => setProperty(data))

    )

    return(
        <div>
            <h1>Details</h1>
            <p>{id}</p>
        </div>
    )
}