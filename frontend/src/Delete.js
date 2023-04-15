import { useEffect,useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export default function Delete(){
    const navigate = useNavigate();
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
    const handleClick = ()=>{
        var emai = localStorage.getItem("email");
        var passwor = localStorage.getItem("password");
        var cred = {
            email: emai,
            password: passwor
        }
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        axios.post("http://localhost:8000/delete", cred)
        .then(response => {
            // Handle the response data
            console.log("in the then");
            if(response.data){
                navigate("/")
            }
        })
        .catch(error => {
            // Handle any errors
            console.log("in the catch");
        });
    }
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
                <br/>
                <button className="delbtn" onClick={handleClick}>
                    Delete
                </button>
            </div>
        </div>
    )
}