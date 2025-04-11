import Link from "next/link";

export default function NameForm() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-left w-full">
        <h2 className="text-slate-700 text-2xl font-bold mb-2">
          Delivery Information
        </h2>

        <p className="text-slate-500 mb-6">
          Input accurate details for prompt delivery of products
        </p>

        <form
          // onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-full">
            <label htmlFor="fullName" className="block text-left text-slate-700 font-medium mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="w-full">
            <label htmlFor="phoneNumber" className="block text-left text-slate-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="w-full">
            <label htmlFor="deliveryAddress" className="block text-left text-slate-700 font-medium mb-2">
              Delivery Address
            </label>
            <textarea
              id="deliveryAddress"
              placeholder="Enter your delivery address"
              rows="3"
              className="w-full border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            ></textarea>
          </div>
          <button
              type="submit" className="text-left underline underline-offset-2 hover:text-green-600 text-blue-500 font-semibold py-2 rounded-md transition w-full">
              Use GPS Location
            </button>

          <Link href="/CatalogPage">
            <button
              type="submit" className="border-blue-500 border-1 hover:text-white hover:bg-blue-600 text-blue-500 font-semibold px-6 py-2 rounded-md transition w-full">
              Submit Form
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
