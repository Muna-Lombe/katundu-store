import { useState } from "react"


export default function useValidatePasswordComplexity() {
  const [pwComplexity, setPwComplexity] = useState({
    length:{
      valid:false,
      message:"Password must be at least 8 characters long"
    },
    upperCase:{
      valid:false,
      message:"Password must contain an uppercase letter"
    },
    lowerCase:{
      valid:false,
      message:"Password must contain a lowercase letter"
    },
    number:{
      valid:false,
      message:"Password must contain a number"
    },
    specialChar:{
      valid:false,
      message:"Password must contain a special"
    }
  })

  const validatePasswordComplexity = (pw) => {
    const password = pw
    const upperCase = new RegExp('[A-Z]')
    const lowerCase = new RegExp('[a-z]')
    const number = new RegExp('[0-9]')
    const specialChar = new RegExp('[!@#$%^&*(),.?":{}|<>]')
    const length = password.length >= 8
    setPwComplexity(ps => ({
      ...ps,
      length: {
        valid: length,
        message: "Password must be at least 8 characters long"
      },
      upperCase: {
        valid: upperCase.test(password),
        message: "Password must contain an uppercase letter"
      },
      lowerCase: {
        valid: lowerCase.test(password),
        message: "Password must contain a lowercase letter"
      },
      number: {
        valid: number.test(password),
        message: "Password must contain a number"
      },
      specialChar: {
        valid: specialChar.test(password),
        message: "Password must contain a special"
      }

    }))

  }


  return { pwComplexity, validatePasswordComplexity }
}