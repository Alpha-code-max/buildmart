import CartSummary from "@/components/CartSummary";
import BuyerForm from "@/components/BuyerForm"

export default function CheckoutPage () {
    return (
        <main className="flex flex-col sm:grid sm:grid-cols-3 gap-4 px-4 py-6 sm:px-6 sm:py-8">
            <div className="sm:col-span-1 mt-6 sm:mt-0">
                <div className="sm:sticky sm:top-6">
                    <CartSummary />
                </div>
            </div>

            <div className="sm:col-span-2 overflow-y-auto max-h-screen sm:pr-4">
                <BuyerForm />
            </div>
        </main>
    );
}