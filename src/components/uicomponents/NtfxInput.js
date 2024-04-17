import React from 'react'

const NtfxInput = ({changeCallback,value,type,placeholder,id,error}) => {

    const onChange = (e) => {
        if(changeCallback){
            changeCallback(e.target.value,id)
        }
    }
    
  return (
    <div>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className="w-full bg-[#333] p-2 my-2 placeholder-[#737373] rounded focus:outline-none focus:border-b-2  focus:border-orange-500"
            onChange={onChange}
            id={id}
          />
       {error && <small className='text-orange-500'>{error}</small>}
    </div>
  )
}

export default NtfxInput