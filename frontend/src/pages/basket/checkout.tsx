import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {FormEvent, useState} from "react";
import {useConfig} from "../../utils/queries";
import Spinner from "../../components/spinner";

export default function CheckoutComponent() {
	const config = useConfig()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const stripe = useStripe()
	const elements = useElements()

	async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
		if (!elements) return
		ev.preventDefault()
		setLoading(true)
		const error = await stripe?.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/basket/success`
			}
		})

		setError(error?.error.message ?? null)
	}

	return config.data ?
		<form onSubmit={handleSubmit}>
			<PaymentElement className={"basket-payment-element"}/>
			{config.data.stripeKey.startsWith("pk_test") && <div>
              This instance is in test mode. Attempting to use a real card will fail.
              See <a href="https://stripe.com/docs/testing#cards">this Stripe doc page</a> for test card details.
            </div>}
			{error && <span>{error}</span>}
			<button disabled={loading} type="submit">Pay</button> {loading && <Spinner />}
		</form>
		: <Spinner/>
}