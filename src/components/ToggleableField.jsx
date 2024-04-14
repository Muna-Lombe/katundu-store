import { useGetName } from "../orm/selectors";
import ContentDescription from "./contents/ContentDescription";
import ContentDetails from "./contents/ContentDetails";
import NameTag from "./NameTag";
import ProductDescriptor from "./ProductDescriptor";

const ToggleableField = ({ children, contentType, variations, contentArray, hasChildElement }) => {
  return(
    <div className="toggleable-field">
      <ContentDetails contentType={contentType} variations={variations}>
        {!children 
          ? contentArray.map((content, x) =>
                <ContentDescription key={x} first={x === 0} id={`${content.specificId}`} >
                  {
                    hasChildElement
                    ? <content.ChildElement/>
                    : <ProductDescriptor key={x + 10} id={`${content.specificId}${x}`} label={<NameTag modelName={content.nameTag.modelName} item={content.nameTag.item} hasLink={true} />} values={content.valuesArray} />
                  }
                  
                </ContentDescription>
              )
          : children
        }

      </ContentDetails>

    </div>
  )
}
export default ToggleableField;