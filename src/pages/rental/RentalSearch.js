import Link from "next/link";
import {useState,useEffect} from "react";
import Cards from "@/pages/rental/Cards";

export default function search(props){
const [dark,setDark]=useState(false)
    useEffect(()=>{

        if(props.dark){
            setDark(true)

        }

    },[props.dark])

    return (
        <div className={dark?"dark":""}>
            <div className={"search"}>
                <div className={"search__container"}>
                    <div className={"search__container__title"}>
                        <h1>Find your next home</h1>
                    </div>
                </div>
            </div>
            <div className={"search__form"}>
<div className={"search__form__container"}>
    <div className={"search__form__container__title"}>
    </div>
    <div className={"search__form__container__form"}>
        <div className="form-group">
            <label htmlFor="search">Zip Codes/Cities/States</label>
            <input style={{height:"50px",width:"600px",borderRadius:"5px",border:"1px solid #ccc",padding:"0 10px"}}
                type="text"
                className="form-control"
                id="search"
                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="is_rental">Homes</label>
            <select
                style={{height:"50px",width:"600px",borderRadius:"5px",border:"1px solid #ccc",padding:"0 10px"}}
                className="form-control"
                id="is_rental"
                value={props.is_rental}
                onChange={(e) => props.setIs_rental(e.target.value)}
            >
                <option value="">All</option>
                <option value="true">Rental</option>
                <option value="false">For Sale</option>
            </select>
        </div>
    </div>
</div>
                <br/>
            </div>
            <div className={"search__cards"}>
                <Cards properties={props.properties}/>
            </div>
        </div>
    )
}