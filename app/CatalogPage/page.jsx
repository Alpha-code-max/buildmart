'use client';

import LoadingBar from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export default function CatalogPage () {



    const fetchUsers = async () => {
        const {data} = await axios.get('http://localhost:3000/api/products')
        return data
    }

    const {data, isLoading, error} = useQuery({
        queryKey:['products'],
        queryFn: fetchUsers,
       
    })

    if(isLoading) return <div><LoadingBar/></div>
    if(error) return <div>An error occured</div>

    return (
    <main className="grid grid-cols-3 gap-2" >
      {data.map((product) =>   
      <ProductCard key={product._id} product={product}/>)}
    </main>
    )
}