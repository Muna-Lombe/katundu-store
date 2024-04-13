import React from 'react'




const LoadingStateComponent = ({forwardRef}) => (
  <div ref={forwardRef} id="loading_component" className="loading_wrapper w-full flex justify-center dark:text-slate-400">
    <div className="flex items-center justify-center  ">

      <div className="pulse-container m-2 ">
        <div className="pulse-bubble pulse-bubble-1"></div>
        <div className="pulse-bubble pulse-bubble-2"></div>
        <div className="pulse-bubble pulse-bubble-3"></div>
        <div className="pulse-bubble pulse-bubble-4"></div>
        <div className="pulse-bubble pulse-bubble-5"></div>
      </div>

    </div>
  </div>
)

export default LoadingStateComponent;