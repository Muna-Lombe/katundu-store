
import React from 'react'

const SearchHistoryIco = ({size=24, fillColor}) => {
  return (
   <span>
      <svg width={size+3} height={size+3} viewBox="0 0 20 20" fill="none"  className=' absolute stroke-2 z-10' xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"  strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 19L14.65 14.65"  strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <svg className='stroke-0 z-0 -scale-x-100 rotate-45' width={size} height={size} fill={fillColor}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path  d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z" /></svg>

   </span>
  )
}

export default SearchHistoryIco
