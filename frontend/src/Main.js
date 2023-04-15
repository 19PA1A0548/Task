import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export default function Main(){

    const navigate = useNavigate();

    const[data,setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        img:""
      }) 
    
      const handleChange = (e)=>{
        setData((state) => ({
          ...state,
          [e.target.name]: e.target.value
        }));
      }
    
      const handleImage = async(e)=>{
        var file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setData((prev)=>({...prev,img:base64})) 
      }
    
    
      const convertToBase64 = (file)=>{
        return new Promise((resolve,reject)=>{
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = ()=>{
            resolve(fileReader.result);
          }
            })
      }
    
      const handleSubmit = (e)=>{
        e.preventDefault();
        localStorage.setItem("email",data.email);
        localStorage.setItem("password",data.password);
        console.log(data);
        const requestOptions = {
          method: 'POST',
          body: JSON.stringify(data)
      };
      axios.post("http://localhost:8000/create", data)
      .then(response => {
          // Handle the response data
          console.log("in the then");
          if(response.data){
            navigate("/home")
          }
      })
      .catch(error => {
          // Handle any errors
          console.log("in the catch");
      });
    
      }
    return(
        <div>
            <div className="main">
        <div className="insidemain">
            <h3>
              Register
            </h3>
            <form onSubmit={handleSubmit}>
                <p>
                First Name: <input type='text' name='firstname' value={data.firstname} onChange={(e)=>handleChange(e)} />
                </p>
                <p>
                Last Name: <input type='text' name='lastname' value={data.lastname} onChange={(e)=>handleChange(e)} />
                </p>
                <p>
                Email: <span style={{marginLeft:"35px"}}><input type='email' name='email' value={data.email} onChange={(e)=>handleChange(e)} /></span> 
                </p>
                <p>
                Password: <span style={{marginLeft:"5px"}}> <input type='password' name='password' value={data.password} onChange={(e)=>handleChange(e)} /></span>
                </p>
                <p>
                  <input onChange={(e)=>handleImage(e)} type='file' name='image' accept='image/*'/>
                </p>
                <button>
                  Register
                </button>
            </form>
        </div>
      </div>
        </div>
    )
}