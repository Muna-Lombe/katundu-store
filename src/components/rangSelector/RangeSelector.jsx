// import React from 'react'


import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./rangeSelector.css";

const RangeSelector = ({ min, max, stateUpdaters, onChange, form="" }) => {
 
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  
  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(stateUpdaters.min.val);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number
      // console.log("min---", maxPercent, minPercent)

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${(maxPercent - minPercent) > 250 ? 100 : (maxPercent - minPercent) }%`;
      }
    }
  }, [stateUpdaters.min.val, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(stateUpdaters.max.val);
      // console.log("max---", maxPercent, minPercent)
      if (range.current) {
        range.current.style.width = `${(maxPercent - minPercent) > 250 ? 100 : (maxPercent - minPercent) }%`;
      }
    }
  }, [stateUpdaters.max.val, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: stateUpdaters.min.val, max: stateUpdaters.max.val });
  }, [stateUpdaters.min.val, stateUpdaters.max.val, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={stateUpdaters.min.val}
        step={(1)}
        ref={minValRef}
        name="range-left"
        form={form}
        onChange={(event) => {
          const value = Math.min(+event.target.value, stateUpdaters.max.val - 100);
          // console.log("minv---", value)
          
          stateUpdaters.min.setMinVal(value);
          event.target.value = value.toString();
        }}
        className={(stateUpdaters.min.val > max - 100 ? "thumb thumb-left thumb--zindex-3" :"thumb thumb--zindex-5")}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={stateUpdaters.max.val}
        step={(1)}
        ref={maxValRef}
        name="range-right"
        form={form}
        onChange={(event) => {
          const value = Math.max(+event.target.value, stateUpdaters.min.val + 100);
          // console.log("maxv---",value)
          
          stateUpdaters.max.setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb-right thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        {/* <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div> */}
      </div>
    </div>
  );
};

RangeSelector.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RangeSelector;

