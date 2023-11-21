// import axios from 'axios'
import { default as axios } from 'axios';

class Get {
  static availableFunctions = [
    "Products"
    ,"SortedProductCategories"
    ,"ProductCategories"
    ,"SortedProducts"
    ,"ProductsByMaxRange"
    ,"LazyLoad"
    ,"OneProduct"
    ,"ProductImages"
    ,"OneProductImage"
    ,"ProductVariations"
    ,"OneProductVariation"
    ,"ProductVariationProperties"
    ,"OneProductVariationProperties"
    ,"ProductVariationPropertyListValues"
    ,"OneProductVariationPropertyListValues"
    ,"ProductVariationPropertyValues"
  ]
  static productObj= {}
  fn=()=>{};
  static rootpath= "http://localhost:5000/api/v1"
  #base= "http://localhost:5000"
  #apiRoute ="/api/v1"
 
  

    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token
 * @return {}
 */
 // Function to make a GET request for user profile
async  getUserProfile({user_id,jwtToken}) {
    const url = `${this.#base}/${this.#apiRoute}/users/${user_id}/profile`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`

                // add any other headers as needed
            },
        });

        // handle the data from the response
        console.log(response.data);
        const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
        // handle errors
        console.error('Error:', error.message);
    }
}
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token 
 * @param {string} updated_user the updated user data
 * @return {}
 */
// Function to make a PUT request to update user profile
async  putUpdateUserProfile({user_id, updated_user,jwtToken}) {
    const url = `${this.#base}/${this.#apiRoute}/users/${user_id}/profile`;
    const body = {
        user: updated_user
    };

    try {
        const response = await axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`

                // add any other headers as needed
            },
        });

        // handle the data from the response
        console.log(response.data);
        const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
        // handle errors
        console.error('Error:', error.message);
    }
}
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
// Function to make a DELETE request to delete user account
async  deleteUser({user_id, jwtToken}) {
    const url = `${this.#base}/${this.#apiRoute}/users/${user_id}`;

    try {
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                // add any other headers as needed
            },
        });

        // handle the data from the response
        console.log(response.data);
        const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
        // handle errors
        console.error('Error:', error.message);
    }
}
  /**
 * 
 * @return {}
 */
// Function to make a GET request for authentication
  async  getAuth() {
      const url = `${this.#base}/${this.#apiRoute}/auth`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a POST request for user signup
  async  postSignUp({userData}) {
      const url = `${this.#base}/${this.#apiRoute}/signup`;
      const body = {
          "user": userData
      };

      try {
          const response = await axios.post(url, body, {
              headers: {
                  'Content-Type': 'application/json',
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a POST request for user login
  async  postLogin({jwtToken}) {
      const url = `${this.#base}/${this.#apiRoute}/login`;
      const auth = {
          "type": "jwt",
          "jwt": {
              "key": "secret",
              "value": "{{jwt-auth}}",
              // other jwt properties
          }
      };

      try {
          const response = await axios.post(url, auth, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request for search
  async  getSearch({query, filters, sort}) {
  
    let urlParams = `query=${query}`;

    if (filters) {
      urlParams += `&${filters}`;  
    }

    if (sort) {
      urlParams += `&${sort}`;
    }

   
    const url = encodeURI(`${this.#base}/${this.#apiRoute}/search?${urlParams}`);
      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
/**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */    }
// Function to make a GET request for store details
  async  getStoreDetails({store_id}) {
      const url = `${this.#base}/${this.#apiRoute}/stores/${store_id}`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a PUT request to update store details
  async  putUpdateStoreDetails({jwtToken, store_id, store_update}) {
      const url = `${this.#base}/${this.#apiRoute}/stores/${store_id}`;
      const body = {
          "store": store_update
      };

      try {
          const response = await axios.put(url, body, {
              headers: {
                  'Content-Type': 'application/json',                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a DELETE request to delete a store
  async  deleteDeleteStore( {jwtToken,store_id}) {
      const url = `${this.#base}/${this.#apiRoute}/stores/${store_id}`;

      try {
          const response = await axios.delete(url, {
              headers: {
                  'Content-Type': 'application/json',                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request for stores
  async  getStores() {
      const url = `${this.#base}/${this.#apiRoute}/stores`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    }/**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
   // Function to make a GET request to get one store
  async getOneStore({ store_id }) {
    const url = `${this.#base}/${this.#apiRoute}/stores/${store_id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
    }/**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
   // Function to make a GET request to get store products
  async getStoreProducts({ store_id }) {
    const url = `${this.#base}/${this.#apiRoute}/stores/${store_id}/products`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */}
  // Function to make a GET request for products
  async  getProducts() {
      const url = `${this.#base}/${this.#apiRoute}/products`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */}
  // Function to make a GET request for product details
  async  getProduct({product_id}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a PUT request to update product details
  async  putUpdateProductDetails({jwtToken,product_id, product_update}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}`;
      const body = {
          product_update
      };

      try {
          const response = await axios.put(url, body, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a DELETE request to delete a product
  async  deleteDeleteProduct({jwtToken,product_id}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}`;

      try {
          const response = await axios.delete(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */}
  // Function to make a POST request to add one item to the cart
  async  postAddOneToCart({jwtToken, cart_items=[], product_id}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/add_to_cart`;
      const body = {
          cart_items
      };

      try {
          const response = await axios.post(url, body, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request for the shopping cart
  async  getShoppingCart({jwtToken}) {
      const url = `${this.#base}/${this.#apiRoute}/shopping-cart`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`
                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request to begin checkout
  async  getBeginCheckout({cart_id, jwtToken}) {
      const url = `${this.#base}/${this.#apiRoute}/shopping-cart/${cart_id}/checkout`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a POST request to complete checkout
  async  postCompleteCheckout({jwtToken, order_id, cart_id}) {
      const url = `${this.#base}/${this.#apiRoute}/checkout/orders/${order_id}/complete_checkout?cart_id=${cart_id}`;

      try {
          const response = await axios.post(url, null, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request for viewing an order
  async  getViewOrder({order_id,jwtToken}) {
      const url = `${this.#base}/${this.#apiRoute}/orders/${order_id}`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a POST request to cancel an order
  async  postCancelOrder({order_id,jwtToken}) {
      const url = `${this.#base}/${this.#apiRoute}/orders/${order_id}/cancel`;

      try {
          const response = await axios.post(url, null, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request for order history
  async  getOrderHistory({user_id,jwtToken}) {
      const url = `${this.#base}/${this.#apiRoute}/users/${user_id}/order-history`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */}
  // Function to make a GET request retrieve product reviews
  async  getProductReview({ product_id}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/reviews`;
      

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    }/**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
   // Function to make a GET request retrieve product reviews
  async  postProductReview({ product_id, jwtToken, review}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/reviews`;
      const body = {
          review
      };

      try {
          const response = await axios.post(url, body, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`


                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    }/**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
   // Function to make a PUT request update product reviews
  async  putProductReview({ product_id, jwtToken, review_id,review_update}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/reviews/${review_id}`;
      const body = {
          review:review_update
      };

      try {
          const response = await axios.put(url, body, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`


                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */}
  // Function to make a DELETE request update product reviews
  async  deleteProductReview({ product_id, jwtToken, review_id}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/reviews/${review_id}`;
      

      try {
          const response = await axios.put(url,  {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`


                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    }/**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
   // Function to make a GET request to retrieve product review questions
  async  getProductReviewQuestions({ product_id, prod_rev_id, ques_ans_id}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/${prod_rev_id}/question_answers/${ques_ans_id}/questions`;

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */}
  // Function to make a POST request to answer a product review question
  async  postProductReviewQuestion({ product_id, prod_rev_id, ques_ans_id, question, jwtToken}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/${prod_rev_id}/question_answers/${ques_ans_id}/ask_question`;
      const body = {
          question
      };

      try {
          const response = await axios.post(url, body, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
    // Function to make a PUT request update product review question
  async  putProductReviewQuestion({ product_id, jwtToken,prod_rev_id,ques_ans_id, question_id,question_update}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/${prod_rev_id}/question_answers/${ques_ans_id}/questions/${question_id}`;
      const body = {
          question:question_update
      };

      try {
          const response = await axios.put(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`


                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    }/**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
   // Function to make a DELETE request update product review question
  async  deleteProductReviewQuestion({ product_id, jwtToken,prod_rev_id,ques_ans_id, question_id}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/${prod_rev_id}/question_answers/${ques_ans_id}/questions/${question_id}`;
     

      try {
          const response = await axios.delete(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`


                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request to get product review answers
  async  getProductReviewQuestionAnswer({ product_id, prod_rev_id, ques_ans_id}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/${prod_rev_id}/question_answers/${ques_ans_id}/answers`;
      

      try {
          const response = await axios.get(url, {
              headers: {
                  'Content-Type': 'application/json',

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
    /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */}
  // Function to make a POST request to answer a product review answer
  async  postProductReviewQuestionAnswer({ product_id, prod_rev_id, ques_ans_id, answer, jwtToken}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/${prod_rev_id}/question_answers/${ques_ans_id}/add_answer`;
      const body = {
          answer
      };

      try {
          const response = await axios.post(url, body, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`

                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
   // Function to make a PUT request update product review answert
  async  putProductReviewQuestionAnswer({ product_id, jwtToken,prod_rev_id,ques_ans_id, answer_id,answer_update}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/${prod_rev_id}/question_answers/${ques_ans_id}/answers/${answer_id}`;
      const body = {
          answer:answer_update
      };

      try {
          const response = await axios.put(url, body, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`


                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
 // Function to make a DELETE request update product review answert
  async  deleteProductReviewQuestionAnswer({ product_id, jwtToken,prod_rev_id,ques_ans_id, answer_id,answer_update}) {
      const url = `${this.#base}/${this.#apiRoute}/products/${product_id}/product_reviews/${prod_rev_id}/question_answers/${ques_ans_id}/answers/${answer_id}`;
     
      try {
          const response = await axios.delete(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`


                  // add any other headers as needed
              },
          });

          // handle the data from the response
          console.log(response.data);
          const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
      } catch (error) {
          // handle errors
          console.error('Error:', error.message);
      }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
    // Function to make a GET request to get store delivery options
  async getOneStoreDeliveryOptions({ store_id }) {
    const url = `${this.#base}/${this.#apiRoute}/stores/${store_id}/delivery_options`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }

  
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request to get shopping cart item
  async getShoppingCartItem({ cart_id, jwtToken }) {
    const url = `${this.#base}/${this.#apiRoute}/shopping-cart/${cart_id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request to get shopping cart item products
  async getShoppingCartItemProducts({ cart_id,jwtToken }) {
    const url = `${this.#base}/${this.#apiRoute}/shopping-cart/${cart_id}/products`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a PUT request to update shopping cart item
  async putShoppingCartItem({ cart_id, jwtToken, cart_item_update }) {
    const url = `${this.#base}/${this.#apiRoute}/shopping-cart/${cart_id}`;
    const body = {
      cart_item: cart_item_update,
    };

    try {
      const response = await axios.put(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a DELETE request to delete shopping cart items
  async deleteShoppingCartItems({ cart_id, jwtToken }) {
    const url = `${this.#base}/${this.#apiRoute}/shopping-cart/${cart_id}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request to get checkout item
  async getCheckoutItem({ order_id, jwtToken }) {
    const url = `${this.#base}/${this.#apiRoute}/checkout-history/${order_id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a PUT request to update one order
  async putOneOrders({ order_id, order_status, jwtToken, order_update }) {
    const url = `${this.#base}/${this.#apiRoute}/checkout-history/${order_id}`;
    const body = {
      order: order_update,
    };

    try {
      const response = await axios.put(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a DELETE request to delete one order
  async deleteOneOrders({ order_id, jwtToken }) {
    const url = `${this.#base}/${this.#apiRoute}/orders/${order_id}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request to get products of one product category
  async getOneProductCategoriesProducts({ prod_cat_id }) {
    const url = `${this.#base}/${this.#apiRoute}/product_categories/${prod_cat_id}/products`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request to get product catalog
  async getProductCatalog() {
    const url = `${this.#base}/${this.#apiRoute}/product_categories/catalog`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }
  /**
 * 
 * @param {string} user_id the id of the current logged in user
 * @param {string} jwtToken the user authentication token * @param {string} jwtToken the user authentication token
 * @return {}
 */
  // Function to make a GET request to get one catalog category
  async getOneCatalogCategory({ category_id }) {
    const url = `http://www.localhost:5000/api/v1/product_categories/catalog?id=${category_id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          // add any other headers as needed
        },
      });

      // handle the data from the response
      console.log(response.data);
      const {data: productData} = await response;

          return productData.data.map((d,x)=>({id:d.id, ...d.attributes}));
    } catch (error) {
      // handle errors
      console.error('Error:', error.message);
    }
  }




}
// export default Get;
// export default Get;
const api = new Get()
export default api
