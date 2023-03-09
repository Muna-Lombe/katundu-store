import { attr,fk, many, Model, ORM } from "redux-orm";
import customReducer from "./reducer";
import { actions } from "../actions/actionTypes";




class ProductVariationProperty extends Model {
    static reducer(action, ProductVariationProperty, session) {
        return customReducer({session, model:ProductVariationProperty, action})
    }
}
ProductVariationProperty.modelName = 'ProductVariationProperty';
ProductVariationProperty.fields = {
    id: attr(),
    name: attr(),
    type: attr(),
    
}
ProductVariationProperty.options = {
    idAttribute: 'id'
}

export const { UPDATE: updatedVariationProperty, REMOVE: removedVariationProperty, ADD: addedVariationProperty, CREATE: createdVariationProperty, ADD_TO: addedVariationPropertyTo, REMOVE_FROM: removedVariationPropertyFrom } = actions().createDefaultFor('ProductVariationProperty')

export default ProductVariationProperty;
