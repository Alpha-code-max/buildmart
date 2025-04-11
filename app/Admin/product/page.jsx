'use client'

import ProductComponent from "@/adminComponent/ProductComponent";
import LoadingBar from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Product() {
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:3000/api/products");
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div><LoadingBar/></div>;
  if (error) return <div>Failed to load products.</div>;

  return (
    <div>
        <h2 className="ml-14 text-blue-500 font-bold text-3xl text-center">
            PRODUCT LIST
        </h2>
      {data.map((product) => (
        <ProductComponent key={product._id} product={product} />
      ))}
    </div>
  );
}
