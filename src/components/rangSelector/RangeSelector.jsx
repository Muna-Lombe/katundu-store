// import React from 'react'


import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./rangeSelector.css";

const RangeSelector = ({ min, max, stateUpdaters, editableValues, onChange, rangeRef }) => {
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const [minValue, setMinValue] = useState(editableValues.min);
  const [maxValue, setMaxValue] = useState(editableValues.max);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );
  const stepValue = Math.floor((max/min));
  // useEffect for maxValRef
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(maxValue);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent > 250 ? 100 : maxPercent - minPercent
          }%`;
      }
    }
  }, [minValue, maxValue, getPercent]);

  // useEffect for minValRef
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(maxValue);

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent > 250 ? 100 : maxPercent - minPercent
          }%`;
      }
    }
  }, [minValue, maxValue, getPercent]);

  // useEffect for onChange
  useEffect(() => {
    onChange({ min: stateUpdaters.min.val, max: stateUpdaters.max.val });
  }, [stateUpdaters.min.val, stateUpdaters.max.val, onChange]);

  const updateMinVal = (value) => {
    const newValue = Math.min(value, stateUpdaters.max.val - 1);
    stateUpdaters.min.setMinVal(newValue, "min");
    setMinValue(newValue);
  };

  const updateMaxVal = (value) => {
    const newValue = Math.max(value, stateUpdaters.min.val + 1);
    stateUpdaters.max.setMaxVal(newValue, "max");
    setMaxValue(newValue);
  };

  return (
    <div className="range_container relative">
      {/* left thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={stateUpdaters.min.val}
        step={stepValue}
        ref={minValRef}
        name="range-left"
        onChange={(event) => {
          const value = Math.min(+event.target.value, stateUpdaters.max.val - 1);
          if (((value+min) <= (maxValue)) && maxValue - stepValue >= value) {//
            updateMinVal(value);
          }
        }}
        className={
          stateUpdaters.min.val > max - 100
            ? "thumb thumb-left thumb--zindex-3"
            : "thumb thumb--zindex-5"
        }
        onBlur={() => updateMinVal(minValRef.current.value)}
      />
      {/* right thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={stateUpdaters.max.val}
        step={stepValue}
        ref={maxValRef}
        name="range-right"
        onChange={(event) => {
          const value = Math.max(+event.target.value, stateUpdaters.min.val + 1);
          // console.log("value", value, "minValue", minValue)
          if ((value >= (minValue+min)) && (minValue + stepValue <= value)) { //
            // value = max
            updateMaxVal(value);
          }
        }}
        className="thumb thumb-right thumb--zindex-4"
        onBlur={() => updateMaxVal(maxValRef.current.value)}
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={rangeRef} className="slider__range" />
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

