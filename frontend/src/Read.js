import { useEffect,useState } from "react";
import axios from "axios";
export default function Read(){
    const[data,setData] = useState("");
    useEffect(()=>{
        var emai = localStorage.getItem("email");
        var passwor = localStorage.getItem("password");
        var cred = {
            email: emai,
            password: passwor
        }
        axios.post("http://localhost:8000/read", cred)
            .then(response => {
                // Handle the response data
                console.log("in the then");
                console.log(response.data[0]);
                setData(response.data[0]);
            })
            .catch(error => {
                // Handle any errors
                console.log("in the catch");
            });
    },[])
    return(
        <div className="readcontainer">
            <div className="readsection">
                <h3>
                    User Details
                </h3>
                <p>
                    First Name: <span>{data.firstname}</span>
                </p>
                <p>
                    Last Name: <span>{data.lastname}</span>
                </p>
                <p>
                    Email: <span>{data.email}</span>
                </p>
                <p>
                    Password: <span>{data.password}</span>
                </p>
                <p>
                    Image:
                </p>
                <img src={data.img}/>
            </div>
        </div>
    )
}