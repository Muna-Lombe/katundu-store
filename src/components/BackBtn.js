import { Link } from "react-router-dom"
import { ArrowLeft } from "../assets"

const BackBtn = ({location}) =>{
    const path = (location?.state?.from?.includes("signin") ? "/" : -1)
    return(
      <Link to={path} className="back-btn">
        <ArrowLeft size={22}/>
      </Link>
    )
  }
  export default BackBtn