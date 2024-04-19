import { useMemo, useRef, useState } from "react"
import { ToggleIco, filterData, titleTagTypes as tags } from "../icons"
import FilterIco from "../icons/FilterIco"

import {RangeSelector } from "../rangSelector";
import { useLazySearchForProductsQuery } from "../../js/middleware/queryHandler";


const FilterSearchResults = ({searchFilters, queryText, hasProducts, children }) => {

const [searchFor, state, {lastArg}] = useLazySearchForProductsQuery();




  const handleApplyFilters = async(e) => {
    e.preventDefault();
    // "filter-search-results"
    console.log("applying filters")
    const forms = document.forms
    const data = {}

    for (const form of forms) {
      new FormData(form).forEach((k, v, x) => {
        // console.log("kv", k, v)
        let target = v.split("-")[0]
        let newk = v.split("-")[1]
        let newk2 = v.split("-")[2] || null
        if(k==="on"){
          data[target] = newk2 ? {[newk]: newk2} : newk

        }else{
          data[target] = { ...data[target], ...(newk2 ? { [newk]: {[newk2]:k} } : {[newk]: k} )}

        }
        // console.log("form data", k, v, x, newk, target, data)
        // 
      });
    }
    console.log("data", JSON.stringify(data), queryText)
    
    await searchFor({searchString:queryText, getFilters: {"all":1}, filters: data })
    // const shouldToggle = window.innerWidth <= 767
    // handleToggleFilters(shouldToggle)
  }
  const Categories = ({ categories, children }) => {
    return (
      <div className="categories-wrapper w-max  flex flex-col gap-1   ">
        <h4 className="category-main-title font-semibold">
          {categories?.title}
        </h4>
        <div className="category-types-wrapper font-medium">
          {
            categories?.content.map((i, x) =>
              <div key={x} className="category-type hover:text-blue-500 cursor-pointer">
                {i}
              </div>
            )
          }
        </div>
      </div>
    )
  }
  const FilterInput = ({ inputType = "toggle", data, children }) => {

    const ToggleOpt = ({ data, type = "checkbox" }) => (
      <form onSubmit={(e) => (e.preventDefault())} id={data.uuid.replace("-", "_") + "-" + data.uuid} action="" name={data.uuid}>
        <div className="toggle-wrapper flex justify-between items-center whitespace-nowrap font-semibold ">
          <label className="w-auto whitespace-normal" htmlFor={data.type + "-" + data.uuid} >{data.label}</label>
          <ToggleIco inputName={data.type + "-" + data.uuid} type={type} form={data.type + "-" + data.uuid} />
        </div>
      </form>
    )
    // checkbox: appearance-none
    const SelectOpt = ({ data }) => {
      if(data.options.length === 0)( <></>)
      
      
      const SelectForm = ({opt,k})=>{
        const formId = data.uuid.replace("-", "_") + "-" + (opt?.tag || "") + "-" + (opt.type || opt.text);//.map((i, x) => (x > 0 ? i[0].toUpperCase() + i.slice(1) : i)).join("") + "-" + (opt.type || opt.text);
        const formName = formId;
        return(
          <form key={k} id={formId} action="" name={formName}>
            <div className="select-option-item  flex flex-row items-baseline gap-2">
              <input type="checkbox" name={formName} defaultChecked={false} form={formId} className={"appearance-none w-[16px] aspect-square border border-slate-300 hover:border-blue-500  checked:w-[14px] checked:mx-[0.999px] checked:bg-blue-500 checked:outline checked:outline-1 checked:outline-blue-500  checked:outline-offset-2  rounded-[4px] cursor-pointer"} />
              <label htmlFor={formName} className="flex flex-row items-center gap-1">
                {opt.hasIco ? <AddIcon size={16} /> : ""}
                {opt.text}
              </label>
            </div>
          </form>
        )
      }
      return (
        <div className="select-wrapper flex flex-col whitespace-nowrap ">
          <div className="h4 selector-title font-semibold">{data?.label}</div>
          <div className="selectors-wrapper flex flex-col font-medium">
            {
              data?.options?.map((opt, x) =>
                <SelectForm opt={opt} k={x} />
              )
            }

          </div>
        </div>
      )
    }
    const RangeSelect = ({ data }) => {
      const [minVal, setMinVal] = useState(data.prices.min.value);
      const [editableMin, setEditableMin] = useState(data.prices.min.value);
      const [maxVal, setMaxVal] = useState(data.prices.max.value);
      const [editableMax, setEditableMax] = useState(data.prices.max.value);
      const minInputRef = useRef(null);
      const maxInputRef = useRef(null);
      const rangeRef = useRef(null);

      const handleStateReset = (e) => {
        e.preventDefault()
        setEditableMin(data.prices.min.value);
        setMinVal(data.prices.min.value);
     
        setEditableMax(data.prices.max.value);
        setMaxVal(data.prices.max.value);
        
        minInputRef.current.value = data.prices.min.value;
        maxInputRef.current.value = data.prices.max.value;

        rangeRef.current.style.left = "0%";
        rangeRef.current.style.width = "100%"
      }
      const handleStateUpdater =(updater, value, minMax)=>{
        if (minMax === "min") {
          const newValue = Math.max(Math.min(value, data.prices.max.value - 1), data.prices.min.value);
          // setMinVal(newValue);
          updater(newValue);
          // minInputRef.current.value = newValue;
        } else if (minMax === "max") {
          const newValue = Math.max(Math.min(value, data.prices.max.value), data.prices.min.value + 1);
          // setMaxVal(newValue);
          updater(newValue);
          // maxInputRef.current.value = newValue;
        }
        
      }

      const stateUpdaters = {
        min: { val: editableMin, setMinVal:(value,type)=>handleStateUpdater(setEditableMin, value, type) },
        max: { val: editableMax, setMaxVal: (value, type) => handleStateUpdater(setEditableMax, value, type) },
      };

      const handleEdit = (e, minMax) => {
        e.preventDefault();
        const newVal = Number.parseInt(e.target.value);

        // Update editable values immediately
        if (minMax === "min") {
          setEditableMin(newVal);
        } else if (minMax === "max") {
          setEditableMax(newVal);
        }
      };

      const handleBlur = (minMax) => {
        // Apply constraints after a delay of 500ms
        setTimeout(() => {
          if (minMax === "min") {
            const newValue = Math.min(Math.min(editableMin, data.prices.max.value - 100), data.prices.min.value);
            // setMinVal(newValue);
            console.log("new min val", newValue)
            setEditableMin(newValue);
            minInputRef.current.value = newValue;
          } else if (minMax === "max") {
            const newValue = Math.max(Math.min(editableMax, data.prices.max.value), data.prices.min.value + 100);
            // setMaxVal(newValue);
            console.log("new max val", newValue)

            setEditableMax(newValue);
            maxInputRef.current.value = newValue;
          }
        }, 100);
      };

      return (
        <div className="range-selector-wrapper flex flex-col whitespace-nowrap font-semibold">
          <h4>{data?.label}</h4>
          <div className="range-wrapper font-medium">
            <div className="range-input flex justify-start">
              <RangeSelector
                min={data.prices.min.value}
                max={data.prices.max.value}
                stateUpdaters={stateUpdaters}
                editableValues={{ min: editableMin, max: editableMax }}
                onChange={({ min, max }) => { }}
                rangeRef={rangeRef}
              />
            </div>
            <div className="current-range-values mx-2 flex flex-row justify-between gap-3">
              <div className="min-value px-2 min-w-[3.5rem] max-w-[6rem] flex justify-center border-2 border-blue-500 rounded-lg">
                <form
                  id={data.uuid.replace("-","_")+ "-" + data.prices.min.uuid}
                  onSubmit={(e) => (e.preventDefault(), handleBlur("min"))}
                  name={data.uuid.replace("-","_")+ "-" + data.prices.min.uuid}
                >
                  <input
                    type="number"
                    name={data.uuid.replace("-","_")+ "-" + data.prices.min.uuid}
                    form={data.uuid.replace("-","_")+ "-" + data.prices.min.uuid}
                    min={data.prices.min.value}
                    max={data.prices.max.value}
                    value={editableMin}
                    ref={minInputRef}
                    onChange={(e) => handleEdit(e, "min")}
                    onBlur={() => handleBlur("min")}
                    onSubmit={(e) => (e.preventDefault(), handleBlur("min"))}

                    className="w-16 focus-within:appearance-none focus:appearance-none flex justify-center text-center"
                  />
                  <label htmlFor={data.uuid.replace("-","_")+ "-" + data.prices.min.uuid}></label>
                </form>
              </div>
              <div className="max-value px-2 min-w-[3.5rem] max-w-[6rem] flex justify-center border-2 border-blue-500 rounded-lg">
                <form

                  id={data.uuid.replace("-","_")+ "-" + data.prices.max.uuid}
                  action=""

                  name={data.uuid.replace("-","_")+ "-" + data.prices.max.uuid}
                  onSubmit={(e) => (e.preventDefault(), handleBlur("max"))}
                >
                  <input
                    
                    type="number"
                    name={data.uuid.replace("-","_")+ "-" + data.prices.max.uuid}
                    form={data.uuid.replace("-","_")+ "-" + data.prices.max.uuid}
                    max={data.prices.max.value}
                    value={editableMax}
                    ref={maxInputRef}
                    onChange={(e) => handleEdit(e, "max")}
                    onBlur={() => handleBlur("max")}
                    onSubmit={(e)=>(e.preventDefault(),handleBlur("max"))}
                    
                    className="w-16 appearance-none focus:appearance-none flex justify-center decoration-transparent text-center"
                  />
                  <label htmlFor={data.uuid.replace("-","_")+ "-" + data.prices.max.uuid}></label>
                </form>
              </div>
              <button onClick={handleStateReset} className="range-resetter flex items-center fill-blue-500 stroke-blue-500 ">
                <svg width="24" strokeWidth={0.5} height="24" xmlns="http://www.w3.org/2000/svg"   class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg>
              </button>
            </div>
          </div>
        </div>
      );

    };

    const AddIcon = ({ iconName = "InfoIco", size }) => {
      const Icon = require("../icons/" + iconName + ".jsx").default
      return (<Icon size={size} />)
    }
    const selectType = (d, t) => {
      switch (t) {
        case "toggle":
          return <ToggleOpt data={data} />;

        case "select":

          return <SelectOpt data={data} />;
        case "range":
          return <RangeSelect data={data} />
        default:
          break;
      }

    }
    return (
      <div className="user-option-wrapper w-max">
        {
          selectType(data, inputType)
        }
      </div>
    )
  }

  const toggleOnOff = (cl,cs1, cs2) =>{
    cl.contains(cs1) ? cl.replace(cs1,cs2) : cl.replace(cs2,cs1)
  }
  const handleToggleFilters = (shouldToggle = true) => {
    // return;
    if (!shouldToggle) return;
    const filterComp = document.getElementById("filter-search-results")
    
    // filterComp.classList.toggle("hidden")
    // filterComp.classList.toggle("flex")
    toggleOnOff(filterComp.classList, "hidden", "flex")
    filterComp.previousSibling.classList.toggle("hidden")
    // console.log(e)
    filterComp.parentNode.classList.toggle("filter-modal-open")
    filterComp.parentNode.nextSibling.classList.toggle("hidden")
    // console.log(filterComp.parentNode)
    filterComp.parentNode.parentNode.nextSibling.classList.toggle("hidden")
  }

  const ApplyFiltersBtn = ({applyFilters }) => (
    <button
      id="apply_filters_btn"
      className={` py-[3px] px-8 w-max text-base h-max flex flex-row-reverse justify-center border-[#2967FF]  rounded-lg border-[1px] active:bg-[#2967FF] stroke-blue-500`}
      onClick={(e) =>{ handleApplyFilters(e); handleToggleFilters(true)}}
    >
      <span className='px-1 md:flex lg:flex xl:flex   text-sm  text-[#2967FF]    active:text-[#ffffff] font-raleway lining-nums tabular-nums  font-[600] text-center'>
        {tags.filterSearchResults.applyFiltersText}
      </span>
    </button>
  )
  const FilterComponent = ({onClick}) => (
    <div id="filter-search-results" className="filter-search-results   w-[90%] greater-than-sm:w-full  h-screen py-2 mx-1 hidden flex-col gap-6 bg-white font-raleway lining-nums tabular-nums  z-[5] overflow-y-clip scrollbar" >
      <h4 className="title w-max text-lg text-blue-500 font-raleway lining-nums tabular-nums  font-semibold underline underline-offset-1 greater-than-sm:pointer-events-none" onClick={(e)=>onClick(e)}>{"Filters"}</h4>
      
      <div className="categories-input-wrapper w-full h-auto flex flex-row flex-wrap greater-than-md:flex-col gap-1">
        <Categories categories={searchFilters.header} />
        <div className="input-fields-wrapper less-than-sm:max-h-72 overflow-hidden">
          <div className="input-fields-wrapper-scrollable w-full h-auto grid grid-flow-row  less-than-logo-min:flex flex-row auto-cols-max auto-rows-max gap-2 scroll-bar overflow-scroll">
            {
              searchFilters.inputData.filter((i,x) => !i.data?.options ? i : i.data?.options.length ? i : false ).map((d, x) => <FilterInput key={x} inputType={d.type} data={d.data} />)
            }
          </div>
        </div>
      </div>
      
      <div className="btn py-4 w-full flex justify-center">
        <ApplyFiltersBtn applyFilters={onClick} />
      </div>
    </div>

  )
  return (
    <div className={"filter-search-results-wrapper mx-1 w-full greater-than-md:max-w-[20rem] flex gap-1 overflow-x-hidden " + (hasProducts ? " h-auto " : "hidden   ") + " transition-height duration-200 ease-linear first:greater-than-sm:hidden  2n-child:greater-than-sm:flex"
}>
      <span className="flex">
        <FilterIco onClick={handleToggleFilters} />
      </span>
      <FilterComponent onClick={handleToggleFilters} />

    </div>
  )
}
export default FilterSearchResults;