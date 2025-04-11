import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";

export default function ShoppingCart() {
  return (
    <main className="grid grid-cols-3 gap-4 px-6 py-8">
      <div className="col-span-2 overflow-y-auto max-h-screen pr-4">
        <Cart />
      </div>

      <div className="col-span-1">
        <div className="sticky top-6">
          <Checkout />
        </div>
      </div>
    </main>
  );
}
