import crypto from "crypto";

import { auth } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });

        if (!session) {
            return Response.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = await req.json();

        if ( !razorpay_order_id || !razorpay_payment_id ||  !razorpay_signature ) {
            return Response.json(
                {
                    success: false,
                    message: "Missing payment details",
                },
                {
                    status: 400,
                }
            );
        }

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid payment signature",
                },
                {
                    status: 400,
                }
            );
        }
        
        const expiresAt = new Date();
        expiresAt.setMonth(
            expiresAt.getMonth() + 1
        );

        await db.collection("subscriptions").updateOne(
            {
                userId: session.user.id,
            },
            {
                $set: {
                    plan: "premium",
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id,
                    expiresAt,
                    updatedAt: new Date(),
                },
                $setOnInsert: {
                    createdAt: new Date(),
                },
            },
            {
                upsert: true,
            }
        );

        return Response.json({
            success: true,
            message: "Premium activated",
            expiresAt,
        });

    } catch (error) { console.error(  "VERIFY PAYMENT ERROR:", error  );

        return Response.json(
            {
                success: false,
                message: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}