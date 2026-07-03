import type { PaymentPlanType } from "./carePlan";

export type CareRequest = {
  region: string;
  date: string;
  time: string;
  careType: string;
  paymentPlan: PaymentPlanType;
  proposedPrice: string;
  preferredSkills: string;
  requestNote: string;
};
