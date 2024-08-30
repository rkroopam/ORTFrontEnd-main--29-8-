export interface IPaymentFormValues {
  period: string;
  name: string;
  perHeadAmount: number;
}
export interface IPaymentModel {
  _id: string;
  period: string;
  name: string;
  perHeadAmount: number;
  status: string;
}
export interface PayPalButtonProps {
  clientId: string;
  amount: string;
}
export interface LernerSignUPFormValues {
  name: string;
  email: string;
  confirmEmail: string;
  country: string;
  grade: string;
  phoneNumber: string;
}
