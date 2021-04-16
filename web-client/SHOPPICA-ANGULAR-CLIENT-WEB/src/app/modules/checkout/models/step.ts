export interface Step {
  text: string;
  link: string;
}

export const FirstStep: Step = {
  text: "cart",
  link: "/cart"
}

export const SecondStep: Step = {
  text: "information",
  link: "/checkout/information"
}

export const ThirdStep: Step = {
  text: "shipping",
  link: "/checkout/shipping"
}

export const FourthStep: Step = {
  text: "payment",
  link: "/checkout/payment"
}
