const ProductTags = ({children, category='Some Category', tags=[{productId:1,text:"Some tag here"},{productId:2,text:"Some tag there where yes"},{productId:3,text:"Some tag somewhere"},{productId:4,text:"Some tag everywhere"},{productId:5,text:"Some tag some place"},{productId:6,text:"Some tag which is a tag"},{productId:7,text:"Some tag here nowhere"},{productId:8,text:"Some tag here why"}] }) => {
  return (
    <div className="tags-array p-3 w-full less-than-xs:max-w-[270px] flex flex-col gap-3">
      <p className="title flex flex-wrap text-xl font-raleway lining-nums tabular-nums  font-bold">
        {`Selections of products in category '${category}'`}
      </p>
      <div className="array w-full overflow-clip flex flex-wrap gap-2 child:cursor-pointer child-hover:text-blue-700 child-hover:bg-slate-300 child:w-max child:px-2 child:py-1  child:bg-slate-200 child:rounded-xl child:text-base child:font-raleway lining-nums tabular-nums  child:font-light">
        {
          tags.map((t,x)=><p key={x} className="tag max-w-[270px] truncate ">{t.text}</p> 
          )
        }
      </div>
    </div>
  )
}
export default ProductTags;