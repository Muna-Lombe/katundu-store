import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CancelIco, colorTags } from './icons'
import { toggledCategory } from '../orm/models/ProductCategoryModel'
import { categories } from '../orm/selectors'
const CategoryTag = ({children, tag, id, text, borderId=0, customFn=false})=>{

//  let cat = useSelector(categories).find(c=> c.id === id) || undefined

  const dispatch = useDispatch()
  

  const handleScroll = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    })
  }

  const handleFilter = (catId, action) => {
    switch (action) {
      // case "remove":
      //   // console.log(action)
      //   dispatch(toggledCategory({ id: catId, set: { active: false} }))
      //   break;
      // case "remove_all" :
      //   // console.log(action)
      //   // dispatch(({set:{active:false}}))
      //   break;
    
      case "add":
        // console.log(action)
        dispatch(toggledCategory({ uuid: tag.uuid, active: true }))
        break;
    }
    // dispatch(setCurrCatId(catId))
    // setCatId(catId)
  }

  if (borderId === 'type_clear'){
    return(
      <div 
        id={`tag tag-${tag.name}`} 
        className={`w-max h-[1.6rem] whitespace-nowrap flex justify-center items-center rounded-2xl py-[0.2rem] mx-1 px-4 border-2 border-gray-200 text-red-600 text-[0.9rem]  font-sans font-semibold cursor-pointer`}
        onMouseDown={(e)=>handleScroll(e)}
        
      >
        <h2 onClick={()=> handleFilter(0, "remove_all")}>
        {tag.name}
        </h2>
      </div>
    )
  }
 
  return(
      <div 
        id={`tag tag-${tag.name}`} 
        onMouseDown={(e)=>handleScroll(e)}
        className={`category-tag my-1 py-[0.2rem] px-4 w-max h-max flex justify-center items-center gap-2 whitespace-nowrap rounded-2xl  text-[0.9rem] font-sans font-semibold cursor-pointer ${colorTags[borderId]}`}
      >
        {
          children  ? 
          children
          : <>
            <h2 className={"p-2 w-full h-full flex flex-row whitespace-normal flex-wrap items-center" + (tag.active ? " bg-white text-orange-400 rounded-md " : " bg-orange-400 text-white dark:text-black overflow-clip truncate rounded-lg border-2 border-transparent hover:border-white ")} onClick={()=> customFn||handleFilter(id||borderId, "add")}>
                {tag.name}
              </h2>


            </>
        }
    </div>
    
    
  )
  }

export default CategoryTag;
