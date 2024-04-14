import React from 'react'

const CheckIco= ({size=16, type="verified"}) => {
  return (
    <>
      {
        type ==="verified" ?
        

        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16"><path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
        : type === "bought" ?
          <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="bi bi-bag-check" viewBox="0 0 16 16"> <path fill="currentColor" fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" /> <path fill="gray" d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" /> </svg>
          
            : <></>
      }
    </>
  )
}

export default CheckIco