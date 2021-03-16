import { PromotionCondition } from "./promotion-condition";

export interface Promotion {
  id: number;
  title: string;
  code: string;
  startDate: string;
  endDate: string;
  discount: number;
  condition: PromotionCondition;
  qrCode: string;
}
