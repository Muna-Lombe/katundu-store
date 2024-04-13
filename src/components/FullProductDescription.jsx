const FullProductDescription = ({ description, children }) => {
  return (
    <div className="full-description my-2 p-2 ">
      <div className="description-1 my-2">
        <div className=" title pb-6 text-2xl font-[arial font-bold">{"Description"}</div>
        <p className="description-text max-w-5xl  text-base font-raleway lining-nums tabular-nums  font-medium">
          {description.text}
        </p>
      </div>
      <div className="description-tags">
        {
          description.tags.map((tag, x) => (
            <div key={x} className={"description-"+(x+1)+" my-2 py-2"}>
              <div className="title text-lg font-[arial font-bold">{tag.label}</div>
              <p className="description-tag py-2  text-base font-raleway lining-nums tabular-nums ">
                {tag.value}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default FullProductDescription;