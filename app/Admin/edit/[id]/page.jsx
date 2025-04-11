import EditPage from "@/adminComponent/EditPage";

const getProductById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            cache: "no-store"
        })

        if(!res.ok) {
            throw new Error("Failed to fetch topic")
        }

        return res.json();
    } catch (error) {
        console.log(error)
    }
}

export default async function EditProduct({params}){
    const {id} = await params;
    const product = await getProductById(id)
    const {name, amount, size, quality, _id} = product
    

    
    return <EditPage amount={amount} size={size} name={name} quality={quality} id={_id}/>
}