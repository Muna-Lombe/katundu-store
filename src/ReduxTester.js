
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filteredCustomModelSelector } from './orm/selectors';
import { actions } from './orm/reducers/rootOrmReducer';
import { json } from 'react-router-dom';
import { updateLocale } from 'moment';
import { useGetProductsQuery, useGetCatalogQuery, useGetProductQuery } from './js/middleware';


// BrowserRouter
function ReduxTester() {
  const [model, setModel]=useState("Product")
  const [update, setUpdate] = useState({ m: null, i: null })
  const [show, setShow]=useState({for:null, id:null})
  
  const {data:posts, isLoading, isSuccess, isError, error} = useGetProductsQuery(); 
  //useSelector(filteredCustomModelSelector(model))
  const dispatch =  useDispatch()
  // const update = useRef(false)
  const Show = ({show})=>{
    let showObj = false
    const { data:obj, isLoading, isSuccess, isError, error } = useGetProductQuery(show.id);
    if (isLoading) {
      showObj = "..isLoading"
    } else if (isSuccess) {
      const { id, attributes ,attributes: { images }, attributes: { categories }, attributes: { variations }, } = obj.data
      showObj = { imagesCount: images.length, categoriesCount: categories.length, variationsCount: variations.length }
      
    } else if (isError) {
      showObj = error
    }
    console.log("shw", showObj)
    return (
      
        <tr   className='w-min'>
          {
            Object.entries(showObj).filter(([k,v])=> !selector[0].hasOwnProperty(k)).map(
              ([k, v], i) =>
                // v ?
                <>
                  <th>
                    {k}
                  </th>
                  <td key={i} className='appearance-none  text-center'>
                    {v}
                  </td>
                </>
                  // : null
            )


          }
        </tr>

    
     
    )
  }
  
  let selector;
  
  if (isLoading) {
    selector = ["..isLoading"]
  } else if (isSuccess) {
    selector = posts.data.map(d=> ({id:d.id, ...d.attributes}))
  } else if (isError) {
    selector = [error]
  }
  console.log("se;", selector)
  
  const handleChooseModel = (e)=>{
    const nextModel = e.target.value
    setModel(nextModel)
  }
  const handleDispatch =(e, id)=>{
    e.preventDefault()
    let forms = document.forms['data']//new FormData();
    let data = {}
    for (var i = 0; i < forms.elements.length; i++) {
        var element = forms.elements[i];

        // Check if the element is an input field (you can customize this condition)
        if (element.type !== "button" && element.type !== "submit") {
          data[element.id] = element.name === "ids" ? [...element.value] : element.value;
        }
      }
    console.log("disp", e.target.dataset)

    // console.log(availActs["for"+model].ADD(data))
    
    dispatch(actions["for"+model][e.target.dataset.dispatchAction]((id+1)?{id:id,...data}:data))
    
  }
  return (
   <div className='flex flex-col items-center'>
      <h2> Testing redu-orm, basics --- only dispatch and select</h2>
      <p>
        {
          ["Product", "User", "Category", "Store"].map((m,x)=> 
            <input type='button' key={x} className="appearance-none mx-2 text-base  hover:text-white hover:bg-black cursor-pointer"  onClick={(e)=>handleChooseModel(e)} value={m}/>
          )
        }
      </p>
      <div>
        <form className='child:border' id="data" name="data" data-dispatch-action="created" onSubmit={(e)=>handleDispatch(e)}>
            {
              (update && (selector.find((m)=> m.id === update.i) !== undefined)) ?
                <>
                  <input id="id" placeholder='id' readOnly value={update.i} className='w-10'  />              
                </>
                : ""
            }
            <input  id="name" placeholder='name'/>
            {
              model === "User" ?
                <>
                  <input id="email" placeholder='email'/>
                  <input id="password" placeholder='password'/>
                </>
                : ""
            }
            {
              model === "Store" ?
                <input id="user_id" placeholder='user_id'/>
                :""
            }
            {
              model === "Product" ?
                <>
                  <input id="store_id" placeholder='store_id'/>
                  <input id="categories" name="ids" placeholder='categories'/>
                </>
                : ""
            }
            {
              model === "Category" ?
                <input id="products" name="ids" placeholder='products'/>
                :""

            }
            <input type='submit'  value="add" className='px-2 text-white bg-gray-500 rounded-lg cursor-pointer active:underline'/>
        </form>
          <table className='table table-auto w-full'>
            <thead  className=' w-full border  '>
              <tr>
                <th colSpan="4" >---{model}---</th>
              </tr>
              <tr>
                  {
                    Object.keys(selector[0]||{}).map((k,x)=>
                      selector[0][k] ?
                        <th key={x} colSpan={0} className='border'>
                            {k}
                        </th>
                        : console.log("")
                    )
                  }
                <th className='border'>actions</th>
              </tr> 
            </thead>
            <tbody className='child:border'>
                 
                
                {
                  selector?.map((s,x)=>
                  <>
                    <tr key={x} className=''>
                        {
                          Object.entries(s).map(
                            ([k,v],i)=>
                              v ?
                              <td key={i} className='appearance-none  text-center'>
                              {v}
                              </td>
                              : console.log("")
                          )

                          
                        }
                        
                          
                        <td className=' child:px-1 flex justify-end child:cursor-pointer child:text-white child:bg-white'>
                          <span onClick={()=>(show.for && (show.id===s.id)) ? setShow({for:null, id:null}) :setShow({for:s.id, id:s.id})}>{(show.for && (show.id===s.id))? '🔓' : '🔒'} </span>
                          <span  onClick={() => setUpdate(p => ({ ...p, i: s.id, m: model }))} >⬆</span>
                          <span data-dispatch-action="removed" onClick={(e) => handleDispatch(e, s.id)} >🗑</span>
                        </td>
                    </tr>
                    {
                      (show.for && (show.id === s.id)) ?
                        <Show show={show} />
                        : null
                    }
                  </>
                  )
                }
               
                  
               
            </tbody>
          </table>
        
      </div>
    </div>
  );
}

export default ReduxTester;
