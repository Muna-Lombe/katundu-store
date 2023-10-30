const ProductTags = ({children, tags=["Some tag here","Some tag there where yes","Some tag somewhere","Some tag everywhere","Some tag some place","Some tag which is a tag","Some tag here nowhere","Some tag here why"] }) => {
  return (
    <div className="tags-array p-3 w-full max-w-5xl flex flex-col gap-3">
      <p className="title flex flex-wrap text-xl font-raleway lining-nums tabular-nums  font-bold">
        {"Selections of products in category 'Some Category'"}
      </p>
      <div className="array flex flex-wrap gap-2 child:cursor-pointer child-hover:text-blue-700 child-hover:bg-slate-300 child:w-max child:px-2 child:py-1  child:bg-slate-200 child:rounded-xl child:text-base child:font-raleway lining-nums tabular-nums  child:font-light">
        {
          tags.map((t,x)=><p key={x} className="tag w-min overflow-clip">{t}</p> 
          )
        }
      </div>
    </div>
  )
}
export default ProductTags;