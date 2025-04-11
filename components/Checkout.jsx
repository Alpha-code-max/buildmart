export default function Checkout() {
    return (
      <main className="max-w-md mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-blue-600 border-b pb-2">Order Summary</h2>
  
        <div className="flex justify-between text-gray-700">
          <span>Subtotal:</span>
          <span className="font-medium">&#8358;9800</span>
        </div>
  
        <div className="flex justify-between text-gray-700">
          <span>Delivery Fee:</span>
          <span className="font-medium">&#8358;9800</span>
        </div>
  
        <div className="flex justify-between text-gray-900 font-bold text-lg border-t pt-3">
          <span>Total:</span>
          <span>&#8358;9800</span>
        </div>
  
        <div className="flex items-center space-x-3">
          <input type="checkbox" id="priority" className="accent-blue-600 w-4 h-4" />
          <label htmlFor="priority" className="text-sm text-gray-700">
            Priority Order (<span className="font-medium">&#8358;9800</span>)
          </label>
        </div>
  
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200">
          Proceed to Checkout
        </button>
      </main>
    );
  }
  