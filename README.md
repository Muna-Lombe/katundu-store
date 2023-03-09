A simple REST interface is implemented to retrieve data.

To get a list of entities, a GET request of the form

https://test2.sionic.ru/api/{model}

is used, where {model} is the name of the entity

The query parameters are passed in the json form of the encoded string. The following query parameters are available:

filter - filtering on any property of the entity, for example filter={"category_id":20} for the Products model will return to us all the products of the category with id=20. You can also specify values as an array if you want to filter out several ids, for example filter={"category_id":[20,21,22]}

sort - sort entities by any property, for example, sort=["name","ASC"] for the model Products will sort products by name in ascending

range - a sample from a range, for example, range=[0,24] will return us all entities from 0th to 24th, a total of 25.

A maximum of 50 records are returned per request.

The total number of records is returned as a header, for example:

Content-Range: Products 0-24/319

To get one record by its id, use a query of the form

https://test2.sionic.ru/api/{model}/{id}

Where {model} is the name of the entity and {id} is its id


The following methods are available:

Categories:

GET https://test2.sionic.ru/api/Categories?sort=["name","ASC"]&range=[0,24]

GET https://test2.sionic.ru/api/Categories/21

Properties:

name - category

name Products:

GET https://test2.sionic.ru/api/Products?sort=["name","ASC"]&range=[0,24]&filter={" category_id":20}

GET https://test2.sionic.ru/api/Products/2001

Properties:

name - product

name category_id - id category


description
Product description
Product images:

GET https://test2.sionic.ru/api/ProductImages?sort=["image_name","ASC"]&range=[0,24]&filter={"product_id":1001}

GET https://test2.sionic.ru/api/ProductImages/3001

Properties:

image_name - image

file name product_id - product

id image_url - product

image link Product variations:

GET https://test2.sionic.ru/api/ProductVariations

GET https://test2.sionic.ru/api/ProductVariations/1

product_id - product

id price - price of this variation of the stock product

- quantity in stock

Properties of variations:

GET
https://test2.sionic.ru/api/ProductVariationProperties
GET https://test2.sionic.ru/api/ProductVariationProperties/1

Properties:

name - property

name type - property type: 0 - string, 1 - integer, 2 - floating-point number, 3 - value from the list

Values of variation property lists:

GET https://test2.sionic.ru/api/ProductVariationPropertyListValues

GET https://test2.sionic.ru/api/ProductVariationPropertyListValues/1

Properties:

product_variation_property_id - id property variation

title - value value

header - Value value

variation properties:

GET https://test2.sionic.ru/api/ProductVariationPropertyValues

GET https://test2.sionic.ru/api/ProductVariationPropertyValues/1

Properties:

product_variation_id - variation properties
id
product_variation_property_id - variation

propertie id value_string - value of type string

value_int - value of type integer

value_float - value of type floating-point

number product_variation_property_list_value_id - id values of variation property from list