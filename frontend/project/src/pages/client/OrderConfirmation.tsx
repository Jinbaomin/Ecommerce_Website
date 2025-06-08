import { Check, Truck, ArrowRight, ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router"
import { IOrder } from "../../types/backend"
import { useQueryClient } from "@tanstack/react-query"
import NotFound from "./NotFound"
import { plusDays } from "../../helper/helper"

interface OrderConfirmationProps {
  orderNumber?: string
  orderDate?: string
  estimatedDelivery?: string
}

export default function OrderConfirmation({
  orderNumber = "ORD-12345-ABCDE",
  orderDate = "2025-10-28 12:00:00",
  estimatedDelivery = "May 10 - May 12, 2025",
}: OrderConfirmationProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const orderId = window.location.pathname.split('/')[2];
  const order: IOrder | undefined = queryClient.getQueryData(['detailOrder', parseInt(orderId)]);

  // if (!order) {
  //   return <NotFound />
  // }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-center">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2 text-center">
          Thank you for your purchase. We've received your order and are processing it now.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Order #{order?.orderId}</h2>
          <p className="text-gray-500 text-sm">Placed on {order?.createdAt}</p>
        </div>

        <div className="p-6">
          {/* Order Status */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <div className="mr-4">
                <Truck className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Estimated Delivery within 7 days</h3>
                <p className="text-gray-600">{plusDays(orderDate, 7)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 mt-6">
            <button
              onClick={() => navigate('/profile/track-order')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors"
            >
              Track Your Order
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <button
              onClick={() => navigate('/products')}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-md border border-gray-300 flex items-center justify-center transition-colors"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* <div className="mt-8 text-center text-gray-600">
        <p>
          Need help?{" "}
          <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
            Contact our support team
          </a>
        </p>
      </div> */}
    </div>
  )
}
