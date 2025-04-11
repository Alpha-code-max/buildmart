export default function Cart () {
    return <div>
        <div className="overflow-x-auto mt-6">
  <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-sm rounded-lg">
    <thead className="bg-blue-100 text-blue-500">
      <tr>
        <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold">Product</th>
        <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold">Price</th>
        <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold">Quantity</th>
        <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold">Total</th>
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-100">
      
      <tr className="hover:bg-blue-50 transition">
        <td className="px-6 py-4 text-sm text-gray-700">Portland Cement</td>
        <td className="px-6 py-4 text-sm text-gray-700">₦9800</td>
        <td className="px-6 py-4 text-sm text-gray-700">10</td>
        <td className="px-6 py-4 text-sm text-gray-700">10</td>
      </tr>
      <tr className="hover:bg-blue-50 transition">
        <td className="px-6 py-4 text-sm text-gray-700">Dangote Cement</td>
        <td className="px-6 py-4 text-sm text-gray-700">₦9500</td>
        <td className="px-6 py-4 text-sm text-gray-700">5</td>
        <td className="px-6 py-4 text-sm text-gray-700">10</td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
}