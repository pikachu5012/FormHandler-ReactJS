import { useState } from "react"
import MyForm from "../Components/Form/MyForm"
import MyList from "../Components/List/MyList"

function App() {

  const [products, setProducts] = useState([]); 
  console.log(products)
  return (
    <>
      <MyForm 
        products = {products}
        setProducts = {setProducts}
      />
      <MyList
        products = {products}
        setProducts = {setProducts}
      />
    </>
  )
}

export default App
