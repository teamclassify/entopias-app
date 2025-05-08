import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

import { useTranslation } from "react-i18next";
import { STRIPE_PUBLIC_KEY } from "../../config";
import paymentsService from "../../services/api/Payments";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const { i18n } = useTranslation();

  const fetchClientSecret = useCallback(async () => {
    const selectedAddress = localStorage.getItem("selectedAddress");

    if (!selectedAddress) {
      console.error("No address selected");
      return;
    }

    const selectedAddressId = JSON.parse(selectedAddress).id;

    const res = await paymentsService.createPaymentIntent({
      currency: i18n.language === "en" ? "usd" : "cop",
      address: selectedAddressId,
    });
    return res.data.session.client_secret;
  }, [i18n.language]);

  const options = { fetchClientSecret };

  return (
    <>
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </>
  );
}

export default CheckoutForm;
