import Checkout from "@/components/Checkout";
import BuyerForm from "@/components/BuyerForm"

export default function CheckoutPage () {
    return <main className="grid grid-cols-3 gap-4 px-6 py-8">
          <div className="col-span-2 overflow-y-auto max-h-screen pr-4">
            <BuyerForm />
          </div>
    
          <div className="col-span-1">
            <div className="sticky top-6">
              <Checkout />
            </div>
          </div>
        </main>
}