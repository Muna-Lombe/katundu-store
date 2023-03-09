import { attr,fk, many, Model, ORM } from "redux-orm";
import customReducer from "./reducer";
import { actions } from "../actions/actionTypes";




class ProductVariationPropertyValue extends Model {
    static reducer(action, ProductVariationPropertyValue, session) {
        return customReducer({session, model:ProductVariationPropertyValue, action})
    }
}
ProductVariationPropertyValue.modelName = 'ProductVariationPropertyValue';
ProductVariationPropertyValue.fields = {
    id: attr(),
    product_variation_id: fk('ProductVariation','propertyValues'),
    product_variation_property_id: fk({to:'ProductVariationProperty',relatedName:'propertyValues', through:'productVariationPropertyListValue',throughFields:'id'}),
    // title: attr(),
    value_str: attr(),
    value_flt: attr(),
    value_int: attr(),
}
ProductVariationPropertyValue.options = {
    idAttribute: 'id'
}

export const { UPDATE: updatedVariationPropertyValue, REMOVE: removedVariationPropertyValue, ADD: addedVariationPropertyValue, CREATE: createdVariationPropertyValue, ADD_TO: addedVariationPropertyValueTo, REMOVE_FROM: removedVariationPropertyValueFrom } = actions().createDefaultFor('ProductVariationPropertyValue')

export default ProductVariationPropertyValue;
