import React, { useState } from 'react'

const ToggleIco = ({inputName,type, form='', size=30}) => {
  const [checked, setChecked] = useState(false)
  const handleCheck =()=>{
      
  }
  const Off=()=>(
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" className="bi bi-toggle2-off  top-0 left-0 child:hover:fill-blue-400 cursor-pointer  transition-all ease-in-out"> <path id="toggle-track" d="M9 11c.628-.836 1-1.874 1-3a4.978 4.978 0 0 0-1-3h4a3 3 0 1 1 0 6H9z" fill="#ced4da" /> <path id="toggle-knob" d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10z" fill="#3b82f6" /> </svg>
  )
  const On = () => (
    <svg fill="#3b82f6" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" className="bi bi-toggle2-on  top-0 left-0 transition-all ease-in-out"> <path id="toggle-track" d="M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z" /> <path id="toggle-knob" d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z" /> </svg>
  )
  return (
    <span className="relative px-2 w-max ">
      <input type={type} form={form} name={inputName} id={inputName} onClick={()=>setChecked(prevS=>!prevS)} className="absolute blue top-0 left-0 w-8 aspect-square appearance-none cursor-pointer" />

      {
        checked 
        ? <On />
        : <Off/>
      }
    </span>
  )
}

export default ToggleIco