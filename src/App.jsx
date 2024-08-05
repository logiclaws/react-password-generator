import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"

function App() {

  // Declarations
  const [length, setLength] = useState(32);
  const [password, setPassword] = useState("");
  const [isNumberAllowed, setIsNumberAllowed] = useState(true);
  const [isSpecialCharacterAllowed, setIsSpecialCharacterAllowed] = useState(true);

  // Refs
  const passwordRef = useRef(null)
  const copyButtonRef = useRef(null)

  // Function to generate password
  const passwordGenerator = useCallback(()=>{
    let pwd = "";
    let pwdStr = "ABCDRFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxtz"

    if(isNumberAllowed) pwdStr += "1234567890"
    if(isSpecialCharacterAllowed) pwdStr += "~!@#$%^&*()_`[]{}\|;':,.<>/?"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * pwdStr.length + 1)
      pwd += pwdStr.charAt(char);
    }

    setPassword(pwd);
  
  }, [length, isNumberAllowed, isSpecialCharacterAllowed, setPassword])


  // Call PasswordGenerator Function
  useEffect(()=>{ 
    passwordGenerator();
  }, [length, isNumberAllowed, isSpecialCharacterAllowed, passwordGenerator])

  // Copy Password to clipboard
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current.select();
    copyButtonRef.current.innerText = 'copied!'
    copyButtonRef.current.classList.add('bg-orange-500')
    setTimeout(()=> {
      copyButtonRef.current.innerText = 'Copy'
      copyButtonRef.current.classList.remove('bg-orange-500')
    },1000);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef} />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard} ref={copyButtonRef} >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setLength(e.target.value)
            }}
             />
             <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={isNumberAllowed}
            id="numberInput"
            onChange={()=>{
              setIsNumberAllowed(prev => !prev)
            }}
             />
             <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={isSpecialCharacterAllowed}
            id="charInput"
            onChange={()=>{
              setIsSpecialCharacterAllowed(prev => !prev)
            }}
             />
             <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
