import type { PaymentPlanType } from "./carePlan";

export type CareRequest = {
  region: string;
  date: string;
  time: string;
  careTypes: string[];
  paymentPlan: PaymentPlanType;
  proposedPrice: string;
  preferredSkills: string;
  requestNote: string;
};
