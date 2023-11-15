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
  fn=function(){};
  rootpath= "http://localhost:5000/api/v1"
  Products = async ()=>{
  // setHeaders = () =>new Headers(
  //   {

  //   }
  // )
  
    const baseUrl = encodeURI(this.rootpath+"/products");

    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  SortedProductCategories = async() => {
    const baseUrl = encodeURI(this.rootpath+"/product_categories/catalog?sort=[\"name\",\"ASC\"]&range=[0,24]");
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  ProductCategories = async(range, prevRange) => {
    const baseUrl = encodeURI(this.rootpath+"/product_categories/catalog?range=["+ (prevRange||0) +","+ (range||10) +"]");
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  SortedProducts = async() => {
    const baseUrl = encodeURI(this.rootpath+"/products?sort=[\"name\",\"ASC\"]&range=[0,10]&filter={}");
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  ProductsByMaxRange = async(range, prevRange) => {
    const baseUrl = encodeURI(this.rootpath+"/products?sort=[\"name\",\"ASC\"]&range=["+prevRange||0+","+range||10+"]&filter={\" category_id\":20}");
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  LazyLoad= async(fn, opt={range:0, prevRange:0, interval:0,limit:0, currentProductData:[]}) => {
    let productData;
    let checkOpts = () => {return Object.keys(opt).every((e)=>(opt[e] !== 0))}
    if(fn === "ProductsByMaxRange"){
        if( checkOpts() && typeof opt.interval === "number" && opt.prevRange !== null ){
          if(opt.limit > 4) return opt.currentProductData;

          for (const func of [this.ProductsByMaxRange, this.ProductsImages, this.ProductCategories,]) {
            let tempData;
            setTimeout(async function(){
              tempData = await func(opt.range, opt.prevRange)
            }, 2000+opt.interval);
            productData = opt.currentProductData[1] ? [...opt.currentProductData, ...tempData] : tempData
          }
          
          return this.LazyLoadProductsByMaxRange(opt.range+10, opt.range, opt.interval, opt.limit++, productData )
      }
      productData = opt.currentProductData.length > 0 ? opt.currentProductData : await this.ProductsByMaxRange(opt.range)
      return productData;
    }
    if(fn === "ProductCategories"){
      let tempData;
            setTimeout(async function(){
              tempData = await this.ProductCategories()
            }, 2000+opt.interval);
      
      return productData = tempData
    }
    
  }

  OneProduct = async() => {
    const baseUrl = encodeURI(this.rootpath+'/products/2001');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }

  ProductImages = async(range, prevRange) => {
    const baseUrl = encodeURI(this.rootpath+"/products/1/product_images?sort=[\"image_name\",\"ASC\"]&range=["+prevRange||0+","+range||10+"]&filter={\" product_id\":1001}");
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    
    return productData;
  }
  
  OneProductImage = async(productid) => {
    const baseUrl = encodeURI(`${this.rootpath}/ProductImages/${productid}`);
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  ProductVariations = async() => {
    const baseUrl = encodeURI(this.rootpath+'/ProductVariations');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }

  OneProductVariation = async() => {
    const baseUrl = encodeURI(this.rootpath+'/ProductVariations/1');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  ProductVariationProperties = async() => {
    const baseUrl = encodeURI(this.rootpath+'/ProductVariationProperties');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  OneProductVariationProperties = async() => {
    const baseUrl = encodeURI(this.rootpath+'/ProductVariationProperties/1');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  //tags
  ProductVariationPropertyListValues = async() => {
    const baseUrl = encodeURI(this.rootpath+'/ProductVariationPropertyListValues');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  OneProductVariationPropertyListValues = async() => {
    const baseUrl = encodeURI(this.rootpath+'/ProductVariationPropertyListValues/1');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  ProductVariationPropertyValues = async() => {
    const baseUrl = encodeURI(this.rootpath+'/ProductVariationPropertyValues');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  OneProductVariationPropertyValues = async() => {
    const baseUrl = encodeURI(this.rootpath+'/ProductVariationPropertyValues/1');
    const {data: productData} = await axios.get(baseUrl)//await fetch(`${baseUrl}/`);
    // const productData = await data.json();
    return productData;
  }
  static allFields = async(saveToFile) => {
    const requester = {
      lastRequest: new Date(2000, 0, 1),
      makeRequest: async function(request) {
        // first check when last request was made
        const timeSinceLast = (new Date()).getTime() - this.lastRequest.getTime();
        this.lastRequest = new Date();
        if (timeSinceLast < 1000) {
          this.lastRequest = new Date(this.lastRequest.getTime() + (1000 - timeSinceLast));
          await new Promise((resolve) => setTimeout(resolve, 1000-timeSinceLast));
        }
        return request;
      },
    };
    let localThis = this;
    Get.availableFunctions.forEach(async(fn)=>{
      var fs //= require('fs');
      
      var Path //= require('path')
      if(fn === "LazyLoad") return 0;
      if(fn.toLowerCase().includes('one')) return 0;
      const data = await requester.makeRequest(localThis[fn]())
      if(fn==="ProductsImages" || saveToFile){
        
        data.forEach(async(obj)=>{
          const path = Path?.resolve(process.cwd(), 'jsonServer', 'images', obj.id+'.jpg')
          console.log("path", path)
          const writer = fs.createWriteStream(path)
          const response = await requester.makeRequest(axios.get(
            
            localThis.rootpath+"/"+obj["image_url"],
            {responseType: 'stream'}
          ))
          
          response.data.pipe(writer)

          return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
          })
        })
        
      }
      
      if(saveToFile){
        const basepath = process.cwd()
        try {
          fs?.writeFileSync(basepath+"/jsonServer/"+fn+".json",JSON.stringify(data))
        } catch (error) {
          console.log("no file exist, appending...")
          fs?.appendFileSync(basepath+"/jsonServer/"+fn+".json",JSON.stringify(data))

        }
        
      }
    })
    return "completed...!"
  }
  
}
// export default Get;
export default Get;