import { useMemo, useRef, useState } from "react"
import { ToggleIco, filterData, titleTagTypes as tags } from "../assets"
import RangeSelector from "./rangSelector/RangeSelector"
import FilterIco from "../assets/FilterIco"

const FilterSearchResults = ({ children }) => {





  const handleApplyFilters = (e) => {
    e.preventDefault();
    // "filter-search-results"
    const forms = document.forms
    const data = {}

    for (const form of forms) {
      new FormData(form).forEach((k, v, x) => {
        let target = v.split("-")[0]
        let newk = v.split("-")[1]
        data[target] = { ...data[target], [newk]: k }
      });
    }
    // console.log("data",JSON.stringify(data))
    const shouldToggle = window.innerWidth <= 767
    handleToggleFilters(shouldToggle)
  }
  const Categories = ({ categories, children }) => {
    return (
      <div className="categories-wrapper w-max  flex flex-col gap-1   ">
        <h4 className="category-main-title font-semibold">
          {categories.mainTitle}
        </h4>
        <div className="category-types-wrapper font-medium">
          {
            categories.categoryTypes.map((i, x) =>
              <div key={x} className="category-type hover:text-blue-500 cursor-pointer">
                {"Cate"}
              </div>
            )
          }
        </div>
      </div>
    )
  }
  const FilterInput = ({ inputType = "toggle", data, children }) => {

    const ToggleOpt = ({ data, type = "checkbox" }) => (
      <form onSubmit={""} id={inputType + "-" + data.id} action="" name={data.id}>
        <div className="toggle-wrapper flex justify-between items-center whitespace-nowrap font-semibold ">
          <label className="w-auto whitespace-normal" htmlFor={inputType + "-" + data.id} >{data.label}</label>
          <ToggleIco inputName={inputType + "-" + data.id} type={type} form={inputType + "-" + data.id} />
        </div>
      </form>
    )
    // checkbox: appearance-none
    const SelectOpt = ({ data }) => (
      <div className="select-wrapper flex flex-col whitespace-nowrap ">
        <div className="h4 selector-title font-semibold">{data.label}</div>
        <div className="selectors-wrapper flex flex-col font-medium">
          {
            data.options.map((opt, x) =>
              <form  key={x} id={inputType + "-" + opt.id} action="" name={inputType + "-" + opt.id}>
                <div className="select-option-item  flex flex-row items-baseline gap-2">
                  <input type="checkbox" name={inputType + "-" + opt.id} defaultChecked={false} form={inputType + "-" + opt.id} className={"appearance-none w-[16px] aspect-square border border-slate-300 hover:border-blue-500  checked:w-[14px] checked:mx-[0.999px] checked:bg-blue-500 checked:outline checked:outline-1 checked:outline-blue-500  checked:outline-offset-2  rounded-[4px] cursor-pointer"} />
                  <label htmlFor={inputType + "-" + opt.id} className="flex flex-row items-center gap-1">
                    {opt.hasIco ? <AddIcon size={16} /> : ""}
                    {opt.text}
                  </label>
                </div>
              </form>
            )
          }

        </div>
      </div>
    )
    const RangeSelect = ({ data }) => {
      const [minVal, setMinVal] = useState(data.prices.min.value);
      const [editableMin, setEditableMin] = useState(data.prices.min.value);
      const [maxVal, setMaxVal] = useState(data.prices.max.value);
      const [editableMax, setEditableMax] = useState(data.prices.max.value);
      const minInputRef = useRef(null);
      const maxInputRef = useRef(null);

      
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
            const newValue = Math.max(Math.min(editableMin, data.prices.max.value - 100), data.prices.min.value);
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
            <div className="range-input">
              <RangeSelector
                min={data.prices.min.value}
                max={data.prices.max.value}
                stateUpdaters={stateUpdaters}
                editableValues={{ min: editableMin, max: editableMax }}
                onChange={({ min, max }) => { }}
              />
            </div>
            <div className="current-range-values mx-2 flex flex-row justify-between">
              <div className="min-value px-2 min-w-[3.5rem] max-w-[6rem] flex justify-center border-2 border-blue-500 rounded-lg">
                <form
                  id={"min-" + data.prices.min.id}
                  action=""
                  name={"min-" + data.prices.min.id}
                >
                  <input
                    type="number"
                    name={"min-" + data.prices.min.id}
                    form={"min-" + data.prices.min.id}
                    min={data.prices.min.value}
                    max={data.prices.max.value}
                    value={editableMin}
                    ref={minInputRef}
                    onChange={(e) => handleEdit(e, "min")}
                    onBlur={() => handleBlur("min")}
                    className="w-16 focus-within:appearance-none focus:appearance-none flex justify-center text-center"
                  />
                  <label htmlFor={"min-" + data.prices.min.id}></label>
                </form>
              </div>
              <div className="max-value px-2 min-w-[3.5rem] max-w-[6rem] flex justify-center border-2 border-blue-500 rounded-lg">
                <form
                  id={"max-" + data.prices.max.id}
                  action=""
                  name={"max-" + data.prices.max.id}
                >
                  <input
                    type="number"
                    name={"max-" + data.prices.max.id}
                    form={"max-" + data.prices.max.id}
                    max={data.prices.max.value}
                    value={editableMax}
                    ref={maxInputRef}
                    onChange={(e) => handleEdit(e, "max")}
                    onBlur={() => handleBlur("max")}
                    className="w-16 appearance-none focus:appearance-none flex justify-center decoration-transparent text-center"
                  />
                  <label htmlFor={"max-" + data.prices.max.id}></label>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const AddIcon = ({ iconName = "InfoIco", size }) => {
      const Icon = require("../assets/" + iconName + ".jsx").default
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
  const handleToggleFilters = (shouldToggle = true) => {

    if (!shouldToggle) return;
    const filterCon = document.getElementById("filter-search-results")
    filterCon.classList.toggle("hidden")
    filterCon.classList.toggle("flex")
    filterCon.previousSibling.classList.toggle("hidden")
    // console.log(e)
    filterCon.parentNode.classList.toggle("filter-modal-open")
    filterCon.parentNode.nextSibling.classList.toggle("hidden")
    // console.log(filterCon.parentNode)
    filterCon.parentNode.parentNode.nextSibling.classList.toggle("hidden")
  }

  const ApplyFiltersBtn = ({ }) => (
    <button
      id="apply_filters_btn"
      className={` py-[3px] px-8 w-max text-base h-max flex flex-row-reverse justify-center border-[#2967FF]  rounded-lg border-[1px] active:bg-[#2967FF] stroke-blue-500`}
      onClick={(e) => handleApplyFilters(e)}
    >
      <span className='px-1 md:flex lg:flex xl:flex   text-sm  text-[#2967FF]    active:text-[#ffffff] font-raleway lining-nums tabular-nums  font-[600] text-center'>
        {tags.filterSearchResults.applyFiltersText}
      </span>
    </button>
  )
  const FilterComponent = () => (
    <div id="filter-search-results" className="filter-search-results hidden  w-full h-screen py-2 mx-1  greater-than-sm:flex flex-col gap-6 bg-white font-raleway lining-nums tabular-nums  z-[5] overflow-y-clip scrollbar" >
      <h4 className="title w-max text-lg text-blue-500 font-raleway lining-nums tabular-nums  font-semibold underline underline-offset-1">{filterData.mainTitle}</h4>

      <Categories categories={filterData.categories} />
      {
        filterData.inputData.map((d, x) => <FilterInput key={x} inputType={d.type} data={d.data} />)
      }
      <div className="btn py-4 w-full flex justify-center">
        <ApplyFiltersBtn />
      </div>
    </div>

  )
  return (
    <div className="filter-search-results-wrapper mx-1 w-full max-w-[20rem] flex gap-1 overflow-x-hidden ">
      <span className="flex greater-than-sm:hidden">
        <FilterIco onClick={handleToggleFilters} />
      </span>
      <FilterComponent />
    </div>
  )
}
export default FilterSearchResults;