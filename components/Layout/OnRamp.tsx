/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAccount } from "wagmi";
import { SafeOnRampKit, StripeAdapter } from "@safe-global/onramp-kit";

import styles from "@/styles/Layout.module.css";

const OnRamp = (): JSX.Element => {
  const { address, isConnected, isConnecting } = useAccount();

  const fundWallet = async (): Promise<void> => {
    if (!address) return;
    const safeOnRamp = await SafeOnRampKit.init(
      new StripeAdapter({
        // Get public key from Stripe: https://dashboard.stripe.com/register
        stripePublicKey:
          "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
        // Deploy your own server: https://github.com/5afe/aa-stripe-service
        onRampBackendUrl: "https://aa-stripe.safe.global",
      }),
    );

    const sessionData = await safeOnRamp.open({
      walletAddress: address,
      networks: ["polygon", "ethereum"],
      element: "#stripe-root",
      // Optional, if you want to use a specific created session
      // sessionId: "cos_1Mei3cKSn9ArdBimJhkCt1XC",
      events: {
        onLoaded: () => console.log("Loaded"),
        onPaymentSuccessful: () => console.log("Payment successful"),
        onPaymentError: () => console.log("Payment failed"),
        onPaymentProcessing: () => console.log("Payment processing"),
      },
    });

    console.log({ sessionData });
  };

  return (
    <div id="stripe-root" className={styles.onramp}>
      <div onClick={fundWallet}>Send USDC with 💳</div>
    </div>
  );
};

export default OnRamp;
