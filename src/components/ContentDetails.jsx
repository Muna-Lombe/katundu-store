import Logo from "./Logo"

const ContentDetails = ({showLogo, contentType, variations = [{ id: 1, name: "yellow bag" }], children }) => {
  // const [activeTab, setActiveTab] = useState("PRs")
  const handleActiveToggle = (e, set) => {
    const curAct = e.target.parentNode.querySelector("."+contentType+"-active")
    const nextContDesc = document.getElementById(`content_desc_${e.target.id.split('_')[1]}`)
    const curContDesc = document.getElementById(`content_desc_${curAct.id.split('_')[1]}`)
    const batchToggleClass = (elemArr, classArr)=>{
      elemArr.forEach(el=> classArr.forEach(cl=> el.classList.toggle(cl)))
    }
    batchToggleClass([curAct, e.target], [(contentType + "-active"), 'text-blue-500', 'border-blue-500']) 

    curContDesc.classList.replace("flex", "hidden")
    nextContDesc.classList.replace("hidden", "flex")
  }
  return (
    <div className={"content-details-"+contentType+" p-2 h-max   flex  flex-col gap-2 order-2 "}>
      {showLogo || ""}

      <div className={contentType+"-variations w-full  flex flex-row gap-2 overflow-hidden child-hover:border-blue-500 [&>.active]:text-blue-500 child child:cursor-pointer"}>

        {
          variations?.sort((a,b)=> a.text-b.text).map((i, x) => (
            <div id={'var_' + i.id} key={x} onClick={(e) => handleActiveToggle(e)} className={"variation-image " + (x === 0 ? contentType + "-active text-blue-500 border-blue-500" : "") + " py-1 px-2 w-max  flex items-baseline border-b-2 border-spacing-2 leading-[8px]  "}>
              {i.text}
            </div>
          ))
        }
      </div>
      <div className="children-wrapper max-w-[400px] flex flex-col gap-1">
        {children}

      </div>
    </div>
  )
}
export default ContentDetails;