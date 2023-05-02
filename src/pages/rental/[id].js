import {connectDb} from "@/pages/db";
import {useRouter} from "next/router";

export default function home(){
    const router = useRouter();
    const {id} = router.query;
    return(
        <div>
            <h1>Details</h1>
            <p>{id}</p>
        </div>
    )
}