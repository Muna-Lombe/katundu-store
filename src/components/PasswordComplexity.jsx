import React from 'react'

const PasswordComplexity = ({ pwComplexity }) => {
  const ComplexityItem = ({ item }) => (
    <div className="flex flex-row gap-1">
      <div className="flex flex-row gap-1">
        <div className="flex flex-row gap-1">
          <div className="flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full ${item.valid ? "bg-green-500" : "bg-red-500"}`}></div>
          </div>
          <div className="flex items-center justify-center">
            <p>{item.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <div className="p-2 flex flex-col gap-1 bg-slate-200 border border-gray-400 rounded-md">
      {
        Object.keys(pwComplexity).map((key, index) => (<ComplexityItem key={"cplx-"+index} item={pwComplexity[key]} />))
      }
    </div>
  )

}

export default PasswordComplexity