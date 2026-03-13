import {useState, useEffect} from 'react'
import axios,  {type AxiosResponse} from "axios"

function Practice() {

    // to define the type of data we are getting from the API
    interface CatFactResponse {
        fact:string;
        length:number ;  

    }
    //define the name data we are getting
    interface NameResponse {
        name: string;
        age: number
    }

    
     const [showValue, setShowValue] = useState<boolean>(true)
     const [catFact, setCatFact] = useState("loading...")
     const [name, setName] = useState("")
     const [age, setAge] = useState("")

     //a function that predicts the age of the inputed user

     async function fetchName (): Promise<void>{
        try{
             const res: AxiosResponse<NameResponse> = await axios.get(`https://api.agify.io/?name=${name}`)
             console.log(res)
              setAge(res.data.age)
        } catch(error: unknown){
            console.error(error.message)
        }
     }
     



     async function fetchCatData (): Promise<void>{
       try{
         const response: AxiosResponse<CatFactResponse> = await axios.get("https://catfact.ninja/fact")
        console.log(response)
        setCatFact(response.data.fact)
       
       } catch(error: unknown){
        // we have to first check if it is an axios error
        if (axios.isAxiosError(error)){
            console.error(error.message)
        } else {
            console.error(error.message)

        }
        
       }
     }

     //we have to call the function in a useEffect so it doesnt run infinitely
     useEffect(() =>{
        fetchCatData()

     }, [])// this makes it runs once

     

  return (
   
    <div>
        {/* function to show how useState hook works */}
        <input type="text" name="" id=""  />
        


      <button onClick={() => setShowValue(!showValue)}>Toggle</button>
      {showValue && <p>Show TExt</p>}

      <h1>Random Cat Facts</h1>
      <p>{catFact}</p>
      <button onClick={() => fetchCatData()}>Generate Another Random Fact</button>
      <input placeholder="Ex.Pedro.." onChange={(event) =>{
        setName(event.target.value)
      } }/>
      <button onClick= {() => fetchName()}>Predict Age</button>
      <p>{`The predicted name of ${name} is ${age}`}</p>

      
    </div>
  )
}

export default Practice
