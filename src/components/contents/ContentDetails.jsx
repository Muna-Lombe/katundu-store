import randomizer from "../../utilities/randomizer"
import Logo from "../Logo"

const ContentDetails = ({showLogo, contentType, productName, variations = [{ id: 1, name: "yellow bag", image:null }], children }) => {
  // const [activeTab, setActiveTab] = useState("PRs")
  const handleActiveToggle = (e, set) => {
    const curAct = e.target.parentNode.querySelector("."+contentType+"-variation-active")
    const nextContDesc = document.getElementById(`content_desc_${e.target.id.split('_')[1]}`)
    const curContDesc = document.getElementById(`content_desc_${curAct.id.split('_')[1]}`)
    const batchToggleClass = (elemArr, classArr)=>{
      elemArr.forEach(el=> classArr.forEach(cl=> el.classList.toggle(cl)))
    }
    curAct.classList.toggle(contentType+"-variation-active")
    e.target.classList.toggle(contentType+"-variation-active")
    batchToggleClass([curAct.firstChild, e.target.firstChild], ['text-blue-500', 'border-blue-500', 'border-b-2', 'border-spacing-2']) 

    curContDesc.classList.replace("flex", "hidden")
    nextContDesc.classList.replace("hidden", "flex")
  }
  return (
    <div className={"content-details-"+contentType+" p-2 h-max   flex  flex-col gap-2 order-2 "}>
      <div className="product-product-name-lg pb-4 hidden lg:flex overflow-clip font-relaway  text-3xl  text-ellipsis">
        <span >{productName}</span>
      </div>
      {showLogo || ""}

      <div className={contentType+"-variations w-max  flex flex-row gap-2 overflow-hidden child-hover:border-blue-500 [&>.active]:text-blue-500 child child:cursor-pointer overflow-scroll scrollbar "}>

        {
          variations?.sort((a,b)=> a.text-b.text).map((i, x) => (
            <div id={'var_' + i.uuid} key={x} onClick={(e) => handleActiveToggle(e)} className={"variation-image " + (x === 0 ? contentType + "-variation-active  " : "") + " py-1 px-2 w-[80px]  flex flex-col flex-nowrap gap-1 items-baseline  leading-[8px]  "}>
              <span className={((x === 0) ? "text-blue-500 border-blue-500 border-b-2 border-spacing-2" : "") + " w-full text-base text-center pointer-events-none "}>{i.text}</span>
              <span className="pointer-events-none rounded-md">
                {i.image ? <img src={"https://placehold.co/600x400/orange/"+randomizer(["red", "blue", "green", "brown", "gray", "black", "white"])} alt={i.name} className="w-20 min-w-[50px] aspect-square object-cover rounded-md" /> : ""}
              </span>
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