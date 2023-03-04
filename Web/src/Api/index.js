import React, {useState, useEffect} from 'react';

const index = () => {
    // const [data, setData] = useState([]);

    // const fetchProducts = () => {
    //     fetch('https://fakestoreapi.com/products')
    //         .then(data=>data.json())
    //         .then(data=>console.log(data))
    // }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        // fetchProducts();
        fetch(`https://fakestoreapi.com/products`)
            .then(res=>res.json())
            .then(json=>console.log(json))

            console.log("yes")
    },[])

  return (
    <div>
        index
    </div>
  )
}

export default index