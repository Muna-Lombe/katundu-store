import React, { useState } from 'react'
import { selectProductNamesThatMatch, setSearchedProductId } from '../../js/slices/products/productsSlice';
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { SearchIco } from '../icons';

 const SearchField =({toggle, fref,popularSearchedProductNames, popSearchData,children})=>{
    const [curtext, setCurtext] =useState("")
    const dispatch = useDispatch();
    // const prodNames = useSelector(selectProductNamesThatMatch());
    // const searchProductText = prodNames[0]?.name || "" //"false"
    const setParams = () =>{
      return createSearchParams({ query: JSON.stringify([curtext]) })
    };
    const goto = useNavigate()
    const textStyle = {
      maxWidth: 'inherit',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
    const handleBlur = (e, type) => {

      e?.stopPropagation()

      const hideSuggestions = () => {
        const optgrp = document.querySelector("optgroup");

        optgrp.replaceChildren("")


        const toggleBoarder = toggle(optgrp.previousElementSibling.classList, { curr: "rounded-3xl", tar: "rounded-t-3xl" });
        const toggleVisibility = toggle(optgrp.classList, { curr: "hidden", tar: "visible" });
        toggleBoarder.off()
        toggleVisibility.off()
      }
      // console.log("can trigger hide", e.relatedTarget === null)
      if (e?.relatedTarget === null || !e) hideSuggestions()
    }

    const handleSubmit = (arr) => {
      // console.log("submit", arr)
      dispatch(setSearchedProductId(arr[0].name ? arr.map((i) => i.name) : arr))
      handleBlur()
      goto("/search?" + createSearchParams({ query: JSON.stringify(arr[0].name ? arr.map((i) => i.name) : arr) }))
    }

    const editDistance = (str1, str2) => {
      str1 = str1.toLowerCase();
      str2 = str2.toLowerCase();
      let costs = new Array();
      for (let i = 0; i <= str1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= str2.length; j++) {
          if (i === 0)
            costs[j] = j;
          else {
            if (j > 0) {
              let newValue = costs[j - 1];
              if (str1.charAt(i - 1) !== str2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[str2.length] = lastValue;
      }
      return costs[str2.length];
    }
    const similarityWeight = (str1, str2) => {
      let longer = str1;
      let shorter = str2;
      if (str1.length < str2.length) {
        longer = str2;
        shorter = str1;
      }
      let longerLength = longer.length;
      if (longerLength === 0) {
        return 1.0;
      }
      const weight = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
      return weight;
      // console.log("str1", str1, "str2", str2, "weight", weight)
    }


    const handleChange = (e) => {
      e.preventDefault()

      const suggestions = (str) => {
        const suggestionsArray = [];
        // console.log("data", data)
        if (str.toString().length < 1) return popularSearchedProductNames.slice(0, 10);



        // match str with popularSearchedProductNames by similarity weight
        // where those productnames with higher similarityweight get put at the top of suggestions array
        const sorted = [...popularSearchedProductNames].sort((a, b) => similarityWeight(str, b.name) - similarityWeight(str, a.name));

        suggestionsArray.push(...sorted.slice(0, 10))
        console.log("suggestionsArray", suggestionsArray)
        return suggestionsArray
      };
      // UNCOMMENT BEFORE COMMIT
      if (e.target.value.length < 1) {
        dispatch(setSearchedProductId([]))
      }
      if (e.key === "Enter" && e.code === "Enter") {
        // console.log("suggestions ", suggestions(e.target.value), e.target.value)
        handleSubmit([e.target.value])
        return;
      }
      ///////////////////////////////////////////////

      const optgrp = document.querySelector("optgroup");
      const toggle = (classList, token) => ({
        on: () => {
          classList.replace(token.curr, token.tar)
        },
        off: () => {
          classList.replace(token.tar, token.curr)
        }
      });

      const toggleBoarder = toggle(optgrp.previousElementSibling.classList, { curr: "rounded-3xl", tar: "rounded-t-3xl" });
      const toggleVisibility = toggle(optgrp.classList, { curr: "hidden", tar: "visible" });

      optgrp.childNodes.forEach(i => optgrp.removeChild(i));

      const sugs = suggestions(e.target.value)
      if (sugs) {
        toggleBoarder.on()
        toggleVisibility.on()
        optgrp.childNodes.forEach(i => optgrp.removeChild(i));
        sugs.forEach((prod, i) => {
          const optElem = document.createElement('option')
          optElem.className = "w-full hover:text-black dark:text-white  hover:bg-slate-200 truncate overflow-x-clip";
          optElem.style = textStyle
          optElem.value = prod.name
          optElem.innerText = prod.name //prod.name.length > 36 ? prod.name.slice(0, 36) + "..." : prod.name
          optElem.key = i
          optElem.addEventListener("click", (ev) => { handleSubmit([ev.target.innerText]) })
          optgrp.insertAdjacentElement("beforeend", optElem)
        })
      } else {

        toggleBoarder.off()
        toggleVisibility.off()
      };
    };

    return(
      <div id="search_field_box" className='relative w-full max-w-[512px] flex flex-col  items-center' onBlur ={(e) => handleBlur(e, "blur")}>


        <div id="search_field" tabIndex={0} className="relative min-w-[14rem]  greater-than-md:min-w-[28rem] w-full max-w-[28rem] greater-than-md:max-w-[32rem] less-than-xs:h-[2rem] h-[2.8rem] max-h-[3.2rem] flex justify-between border-[1px] rounded-3xl">
          {/* <div className="search-input relative w-full max-w-[22rem]  flex   justify-between p-[1px]"> */}
            
            <input type="text" ref={fref}  name="search" defaultValue={curtext} placeholder={popularSearchedProductNames[0]?.name||""} onKeyUp={(e) => {handleChange(e); setCurtext(e.target.value)}} className=" search autofill:selection bg-white w-full rounded-bl-3xl rounded-tl-3xl bg-transparent px-2  text-black dark:text-white    text-[1rem] focus:outline-none" />
      
            <Link to={"search?" + setParams()} onClick={() => handleBlur()} className=" top-0 right-0 w-1/5 h-full rounded-3xl m-[0.00rem] px-2 bg-[#F0F4FB] flex justify-center items-center">
              <SearchIco />
            </Link> 
        </div>
        {children}
      </div>
    )
  }

export default SearchField