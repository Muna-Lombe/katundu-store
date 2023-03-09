import Logo from "./Logo"

const ContentDetails = ({showLogo, contentType, variations = [{ id: 1, name: "yellow bag" }], children }) => {
  // const [activeTab, setActiveTab] = useState("PRs")
  const handleActiveToggle = (e, set) => {
    const curAct = e.target.parentNode.querySelector(".active")
    
    const nextContDesc = document.getElementById(`content_desc_${e.target.id.split('_')[1]}`)
    const curContDesc = document.getElementById(`content_desc_${curAct.id.split('_')[1]}`)
    curAct.classList.toggle("active")
    curContDesc.classList.replace("flex", "hidden")
    nextContDesc.classList.replace("hidden", "flex")
    e.target.classList.toggle("active")
    // console.log("curAct", nextContDesc)
  }
  return (
    <div className="content-details p-2 w-auto h-max   flex  flex-col gap-3 order-2 ">
      {
        showLogo 
        ? showLogo
        :""
      }

      <div className={contentType+"-variations w-full  flex flex-row gap-2 overflow-hidden child-hover:border-blue-500 [&>.active]:text-blue-500 child child:cursor-pointer"}>

        {
          variations?.map((i, x) => (
            <div id={'var_' + i.id} onClick={(e) => handleActiveToggle(e)} className={"variation-image " + (x === 0 ? " active" : "") + " py-1 px-2 w-max  flex items-baseline border-b-2 border-spacing-2 leading-[8px]  "}>
              {i.text}
            </div>
          ))
        }
      </div>
      <div className="children-wrapper  max-w-[400px] flex flex-col gap-4">
        {children}

      </div>
    </div>
  )
}
export default ContentDetails;