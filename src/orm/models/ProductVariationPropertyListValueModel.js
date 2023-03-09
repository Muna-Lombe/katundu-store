import { attr,fk, Model } from "redux-orm";
import customReducer from "./reducer";
import { actions } from "../actions/actionTypes";




class ProductVariationPropertyListValue extends Model {
    static reducer(action, ProductVariationPropertyListValue, session) {
        return customReducer({session, model:ProductVariationPropertyListValue, action})
    }
}
ProductVariationPropertyListValue.modelName = 'ProductVariationPropertyListValue';
ProductVariationPropertyListValue.fields = {
    id: attr(),
    title: attr(),
    value: attr(),
    product_variation_property_id: fk('ProductVariationProperty','listValues')
}
ProductVariationPropertyListValue.options = {
    idAttribute: 'id'
}
export const { UPDATE: updatedVariationPropertyListValue, REMOVE: removedVariationPropertyListValue, ADD: addedVariationPropertyListValue, CREATE: createdVariationPropertyListValue, ADD_TO: addedVariationPropertyListValueTo, REMOVE_FROM: removedVariationPropertyListValueFrom } = actions().createDefaultFor('ProductVariationPropertyListValue')

export default ProductVariationPropertyListValue;
