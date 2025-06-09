import Transaction from "@/models/transaction";
import db from "@/utils/db";
import stripe from "@/utils/stripe";
import { Stripe } from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await db();

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const transaction = await new Transaction({
        sessionId: session.id,
        customerId: session.customer,
        invoiceId: session.invoice,
        subscriptionId: session.subscription,
        mode: session.mode,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        status: session.status,
      });

      await transaction.save();

      return Response.json({
        message: "Webhook received: Checkout session completed",
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Webhook Error", { status: 400 });
  }
}
