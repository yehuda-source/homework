import { component } from "react";

export default function Address({street, city, state, zip}){
    return(
        <><div>{street} {city} {state} {zip}</div>
        </>
    )
}