import { Link } from "react-router-dom";
import { useGetName } from "../orm/selectors";

const NameTag = ({ modelName, item: { id, prop }, hasLink }) => {
  const name = useGetName(modelName, id)
  return(
    
      hasLink
      ? <Link to={hasLink.path} state={{ query: hasLink.query }} className="cursor-pointer">{name + (prop ? prop : "")}</Link>
      : <span>{name + (prop ? prop : "")}</span>
    
    
  )
}
export default NameTag;