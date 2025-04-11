import Link from "next/link";

export default function NameForm() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center w-full">
      <h2 className="text-slate-700 text-5xl font-bold mb-2">
  Welcome to{" "}
  <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent font-extrabold">
    BuildMart
  </span>
</h2>


        <p className="text-slate-500 mb-6">Your one-stop shop for building materials</p>

        <form
        //   onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Link href="/CatalogPage">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Get Started
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
