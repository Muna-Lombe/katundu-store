
export const setTextBg = (text, color="initial",  size={h:1, w:1, x:0, y:1, font:8})=>(
  
  { backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' height=\'' + size.h + 'px\' width=\'' + size.w + 'px\' style=\'\'><text x=\'' + size.x + '\' y=\'' + size.y + '\' color=\'' + color +'\' fill=\''+color+'\' font-family=\'' + 'Raleway, San-Serif, Segoui, Monospace' +'\' font-size=\'' + size.font+'px'  +'\'>'+text+'</text></svg>")' }
)

export const filterData = {
   categories : { mainTitle: "Category", categoryTypes: [1, 2, 3, 4] },
   inputData : [
    {
      type: "toggle",
      data: {
        id: "onlyDiscounts", label: "Only Products On Discount  ",
      }
    },
    {
      type: "select",
      data: {
        id: "delivery-time",
        label: "Delivery Time",
        options: [
          { id: "7days", type: "regular", text: "Up to 7 days" },
          { id: "todayTomorrow", type: "sameDay", text: "Today or tomorrow", hasIco: true },
          { id: "30mins", type: "express", text: "From 30 minutes", hasIco: true },
          { id: "5days", type: "regular", text: "Up to 5 days" }
        ]
      }
    },
    {
      type: "range",
      data: {
        id: "price", label: "Price",
        prices: { min: { id: "priceMin", value: 500 }, max: { id: "priceMax", value: 3210 } }
      }
    }

  ]
}
export const titleTagTypes={
  currencyType : "K",
  location: { city: "Lusaka", state: " Lusaka Province" },
  buyBtn:{
    mainText :"Add to cart", subText :"Delivery Tomorrow", tooltip :"Item already in cart"
  },
  collectionCard:{
    text:"New Collection"
  },
  home:{
    categoriesText: "Categories", settingsText: "Settings"
  },
  cart:{
    currencyType : "zmw", cartTag:"Cart", emptyCartBtnTag:"Empty Cart",
    qtyType: "pcs.", promoCountdown: "ends in ", priceMinTag: "from", checkoutTag:"Checkout", totalInCartTag:"Cart Total"
  },
  checkout:{
    checkoutText: "Complete Checkout", orderWhenText : "Delivery date", orderToWhereText : "Delivery address",
     receiverNameText : "Receiver's name", phoneText :"Receiver's contact",
    totalPriceText : "Order total", deliveryCostText : "Delivery cost", sumTotalText : "Total", checkoutBtnText : "Checkout" 
  },
  contentSpecification:{
    mainText : "Go to the description", subText :"Unit value of the product"
  },
  discountInfo:{
    titleText: "The best price for Katundu", moreText: "Learn About Price Reduction",
  },
  footer:{
    storename: "Katundu", joinus: "Join Us!", appInstall: "Install the app", trademark: "© Katundu", legal:"legal information",
    privacy:"Privacy Policy"
  },
  filterSearchResults:{
    applyFiltersText:"Apply Filters" 
  },
  noItem:{
    mainText : "😃 Waiting for products to load 😃", subText :"🙅 looks like no items here 👀"
  },
  orderHistory:{
    mainText: "History of orders", showMoretext : "Read more", orderStatusText : "Order status", orderNumberText : "Order number", 
    quantityOrderedText : "Number of goods", orderCostText : "Order cost", deliveryAddressText :"Delivery address"
  },
  orderInfo:{
    text : "Information about delivery"
  },
  paymentType:{
    mainText :"Katundu installments", subText :"Read more"
  },
  pickupPoints:{
    text : "Supply points and postmates"
  },
  questionBanner:{
    mainText: "Ask a question about the product",
    subText: "You will be answered by the seller, brand representative or user who bought this product.We will send a notification when a response is received"
  },
  reviewsAndQuestions:{
    mainText:"Reviews and questions about the product", 
    productReviewsText:"PRODUCT REVIEWS",
    QAsText:"QUESTIONS AND ANSWERS ABOUT THE PRODUCT"
  }

  
}

export const colorTags = {
  1: 'border-2 border-black text-red-500',
  2: 'border-2 border-black text-red-500',
  3: 'border-2 border-black text-red-500',
  4: 'border-2 border-black text-red-500',
  5: 'border-2 border-black text-red-500',
  6: 'border-2 border-black text-red-500'
}
const tags = [
  [6, 'День Рождения Гриши'],
  [5, 'Подарок коллегам'],
  [4, 'Подарок'],
  [5, 'Мишка'],
  [3, 'Мартышка'],
  [2, 'Игрушка'],
  [1, 'валентинки'],
]
const productStores = [
  { id: 1, name: "Davies\' Store" },
  { id: 2, name: "Clear fawn" },
  { id: 3, name: "About face" },
  { id: 4, name: "Avita" }
]
export const calcDisc = (price, discPerc) => {
  return (price - (price * (discPerc / 100))).toFixed(0)
}
const sampleData = [
  [1, "some nice product 10% super CHEAP!", [tags[3], tags[4], tags[1]], productStores[0], 3000, [true, 5,]],
  [3, "Great product 5% DISCOUNT", [tags[1], tags[2], tags[3]], productStores[1], 12000, [true, 5]],
  [5, "FACIAL CREAM NEW STOCK!", [tags[4], tags[3], tags[2]], productStores[2], 1500, [false]],
  [7, "some nice product 10% super CHEAP!", [tags[6], tags[4], tags[1]], productStores[3], 1000, [false]],
  [2, "Great new from somewhere stock super cheap product", [tags[2], tags[4], tags[6]], productStores[0], 9000, [true, 5]],
  [4, "FOR YOUR FACE GREAT NICE EVERYTHING NICE!", [tags[1], tags[3], tags[5]], productStores[1], 16000, [true, 5]],
  [6, "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam quidem ipsa fugit quod i", [tags[4], tags[3], tags[2]], productStores[3], 3500, [false]]
]
export const addToProductData = (product, id) => {

  // if (id > sampleData.length) {id = 0}

  const newProduct = Object.assign({
    ...product,
    // category_tags: sampleData[id][2],
    store: sampleData[id][3],
    isDiscounted: sampleData[id][5],
    unitValues:product.images[0]?.image_name?.includes("cf.jpg")
    ?[
      {label: "Proteins", value: "10"},
      {label: "Fats", value: "14"},
      {label: "Carbohydrates", value: "25"},
      {label: "Kcal", value: "270"}
    ]
    :[]
  })

 
 
  
  
  
  
  
  
  return newProduct
}

export {default as SearchIco } from './SearchIco';
export {default as PinIco } from './PinIco';
export {default as BasketIco } from './BasketIco';
export {default as CartIco } from './CartIco';
export {default as SidebarBanner } from './SidebarBanner';
export {default as DiscountIco } from './DiscountIco';
export {default as DeleteIco } from './DeleteIco';
export {default as LocationIco } from './LocationIco';
export {default as OpenIco } from './OpenIco';
export {default as CopyIco } from './CopyIco';
export {default as HomeIco} from './HomeIco';
export { default as AvatarIco } from './AvatarIco';
export { default as FbIco } from './FbIco';
export { default as InstaIco } from './InstaIco';
export { default as VkIco } from './VkIco';
export { default as ArrowRight } from './ArrowRight';
export { default as ArrowLeft } from './ArrowLeft';
export { default as ArrowDown } from './ArrowDown';
export { default as BellIco } from './BellIco';
export { default as InfoIco } from './InfoIco';
export { default as CheckIco } from './CheckIco';
export { default as StarIco } from './StarIco';
export { default as ThumbIco } from './ThumbIco';
export { default as CancelIco } from './CancelIco';
export { default as ToggleIco } from './ToggleIco';
export { default as FilterIco } from './FilterIco';
export { default as CouponIco } from './CouponIco';
