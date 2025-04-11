import { useState } from "react";
import { MdEditDocument, MdDelete } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductComponent({ product }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const deleteProduct = async () => {
    const res = await fetch(`http://localhost:3000/api/products?id=${product._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setShowConfirm(false);
      router.refresh();
    }
  };

  return (
    <>
      {/* Main Card */}
      <main className="flex mx-auto justify-between items-center text-gray-700 shadow p-5 my-6 w-11/12">
        <div>
          <h2 className="font-bold text-2xl text-blue-500">{product.name}</h2>
          <h2>{product.quality}</h2>
        </div>
        <h2>{product.amount}</h2>
        <h2>{product.size}</h2>
        <div className="flex gap-3 text-blue-500">
          <Link href={`/Admin/edit/${product._id}`}>
            <MdEditDocument size={30} />
          </Link>
          <MdDelete
            size={30}
            className="text-red-500 cursor-pointer"
            onClick={() => setShowConfirm(true)}
          />
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Are you sure?</h2>
            <p className="text-gray-600 mb-4">Do you really want to delete this product?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={deleteProduct}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
