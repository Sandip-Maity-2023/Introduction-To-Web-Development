
import React from 'react'

const AddAddress=({close}) =>{

    const {register,handleSubmit,reset}=useForm()
    const {fetchAddress}=useGlobalContext()

    const onSubmit=async(data)=>{
        console.log("data",data)

        try {
            
        } catch (error) {
            
        }
    }
  return (
    <div>AddAddress</div>
  )
}

export default AddAddress









