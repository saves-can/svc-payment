import {
  PAYMENT_PROVIDER_NAME as PAYMENT_MERCADOPAGO_NAME,
  requestCheckout as requestCheckoutMercadoPago,
} from "./mercadopago.ts";

import {
  PAYMENT_PROVIDER_NAME as PAYMENT_STRIPE_NAME,
  requestCheckout as requestCheckoutStripe,
} from "./stripe.ts";

export interface Item {
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface Redirects {
  success: string;
  failure: string;
  pending?: string;
}

export interface PaymentProvider {
  name: string;
  key: string;
  redirects: Redirects;
}

export interface CheckoutRequest {
  items: Item[];
  provider: PaymentProvider;
}

export interface CheckoutResponse {
  id: string;
  url: string;
  provider: {
    name: string;
  };
}

// Create map of requestCheckoutByProvider
const requestCheckoutByProvider = new Map();

requestCheckoutByProvider.set(PAYMENT_STRIPE_NAME, requestCheckoutStripe);
requestCheckoutByProvider.set(
  PAYMENT_MERCADOPAGO_NAME,
  requestCheckoutMercadoPago,
);

export async function requestCheckout(
  providerName: string,
  checkoutRequest: CheckoutRequest,
) {
  return await requestCheckoutByProvider.get(providerName)(checkoutRequest);
}

export { PAYMENT_MERCADOPAGO_NAME, PAYMENT_STRIPE_NAME };
