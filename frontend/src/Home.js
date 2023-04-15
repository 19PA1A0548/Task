import {Link} from "react-router-dom";
export default function Home(){
    return(
        <div className="homecont">
           <div className="home">
                <h1>
                    Welcome to Home section
                </h1>
                <button>
                    <Link className="lin" to="/read">Read</Link>
                </button>
                <button>
                    <Link className="lin" to="/update">Update</Link>
                </button>
                <button>
                    <Link className="lin" to="/delete">Delete</Link>
                </button>
           </div>
        </div>
    )
}