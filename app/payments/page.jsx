"use client";

import { toast } from "sonner";

export default function PricingPage() {

    const payNow = async (plan) => {
        try {
            var amount = 0;
            if (plan === "premium") amount = 500;

            const response = await fetch(
                "/api/orders/create-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        amount,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to create order"
                );
            }

            const order = await response.json();

            if (!window.Razorpay) {
                throw new Error(
                    "Razorpay SDK not loaded"
                );
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: "payment gateway",
                description: "Premium Subscription",

                handler: async function (response) {
                    try {
                        const verifyResponse = await fetch(
                            "/api/orders/verify-order",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(response),
                            }
                        );

                        const result = await verifyResponse.json();
                        if (!verifyResponse.ok) {
                            throw new Error(
                                result.message ||  "Verification failed"
                            );
                        }
                        toast.success(
                            "Premium subscription activated"
                        );
                    } catch (error) {
                        toast.error( error.message || "Verification failed" );
                    }
                },
                modal: {
                    ondismiss: () => {
                        toast.info(
                            "Payment Cancelled"
                        );
                    },
                },
                theme: {
                    color: "#000000",
                },
            };

            const razorpay = new window.Razorpay(
                options
            );

            razorpay.on( "payment.failed",
                function (response) {
                    toast.error( response.error ?.description ||"Payment Failed");
                }
            );
            razorpay.open();
        } catch (error) {
            toast.error(
                error.message ||
                "could not make the payment"
            );
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">

                {/* Free Plan */}
                <div className="border rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-2">
                        Free
                    </h2>

                    <p className="text-muted-foreground mb-6">
                        Basic access to the platform.
                    </p>

                    <div className="mb-6">
                        <span className="text-4xl font-bold">
                            ₹0
                        </span>
                        <span className="text-muted-foreground">
                            /month
                        </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                        <li>✓ Limited access</li>
                        <li>✓ Basic features</li>
                        <li>✓ Community support</li>
                    </ul>

                    <button
                        onClick={() => toast("you are not required to pay for it")}
                        className="w-full rounded-lg border py-2 font-medium cursor-pointer bg-black text-white"
                    >
                        Current Plan
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="border rounded-2xl p-8 shadow-lg relative">
                    <span className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                        Popular
                    </span>

                    <h2 className="text-2xl font-bold mb-2">
                        Premium
                    </h2>

                    <p className="text-muted-foreground mb-6">
                        Unlock all premium features.
                    </p>

                    <div className="mb-6">
                        <span className="text-4xl font-bold">
                            ₹500
                        </span>
                        <span className="text-muted-foreground">
                            /month
                        </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                        <li>✓ Unlimited access</li>
                        <li>✓ Premium features</li>
                        <li>✓ Priority support</li>
                        <li>✓ Early access updates</li>
                    </ul>

                    <button
                        className="w-full rounded-lg bg-black text-white py-2 font-medium hover:opacity-90 cursor-pointer"
                        onClick={() => {
                            toast.success("Processing the order")
                            payNow("premium")
                        }}
                    >
                        Upgrade Now
                    </button>
                </div>

            </div>
        </div>
    );
}