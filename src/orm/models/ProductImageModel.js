import { attr,fk, many, Model, oneToOne, ORM } from "redux-orm";
import customReducer from "./reducer";
import { actions } from "../actions/actionTypes";




class ProductImage extends Model {
    static reducer(action, ProductImage, session) {
        return customReducer({session, model:ProductImage, action})
    }
}
ProductImage.modelName = 'ProductImage';
ProductImage.fields = {
    id: attr(),
    image_name: attr(),
    image_url: attr(),
    product_id: fk('Product', 'images',),
    
}

ProductImage.options = {
    idAttribute: 'id'
}

export const { UPDATE: updatedImage, REMOVE: removedImage, ADD: addedImage, CREATE: createdImage, ADD_TO: addedImageTo, REMOVE_FROM: removedImageFrom } = actions().createDefaultFor('ProductImage')

export default ProductImage;
