export type PaymentPlanType = "single" | "subscription";

export type CarePlan = {
  id: string;
  title: string;
  type: PaymentPlanType;
  priceLabel: string;
  description: string;
  features: string[];
};
