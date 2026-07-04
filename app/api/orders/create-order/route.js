import { razorpay } from "@/lib/razorpay";

export async function POST(req) {
    try {
        const { amount } = await req.json();

        const order = await razorpay.orders.create({
            amount: amount * 100, 
            currency: "INR",
            receipt: `receipt_${Date.now()}_raviKumar`,
        });

        return Response.json(order);
    } catch (error) {
        return Response.json({
                error: error.message
            },
            {status: 500}
        );
    }
}