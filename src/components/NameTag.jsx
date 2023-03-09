import { useGetName } from "../orm/selectors";

const NameTag = ({ modelName, item: { id, prop } }) => {
  return(
    <span>{useGetName(modelName, id) + (prop ? prop : "")}</span>
  )
}
export default NameTag;