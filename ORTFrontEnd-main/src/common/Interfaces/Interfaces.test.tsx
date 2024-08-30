import { IPaymentFormValues, IPaymentModel, PayPalButtonProps, LernerSignUPFormValues } from './interfaces'; // Adjust the import path

describe("Interface Structure Tests", () => {
  test("should correctly structure IPaymentFormValues", () => {
    const paymentFormValues: IPaymentFormValues = {
      period: "Monthly",
      name: "Premium Plan",
      perHeadAmount: 10,
    };

    expect(paymentFormValues.period).toBe("Monthly");
    expect(paymentFormValues.name).toBe("Premium Plan");
    expect(paymentFormValues.perHeadAmount).toBe(10);
  });

  test("should correctly structure IPaymentModel", () => {
    const paymentModel: IPaymentModel = {
      _id: "abc123",
      period: "Annual",
      name: "Enterprise Plan",
      perHeadAmount: 100,
      status: "Active",
    };

    expect(paymentModel._id).toBe("abc123");
    expect(paymentModel.period).toBe("Annual");
    expect(paymentModel.name).toBe("Enterprise Plan");
    expect(paymentModel.perHeadAmount).toBe(100);
    expect(paymentModel.status).toBe("Active");
  });

  test("should correctly structure PayPalButtonProps", () => {
    const paypalButtonProps: PayPalButtonProps = {
      clientId: "client-id-123",
      amount: "50.00",
    };

    expect(paypalButtonProps.clientId).toBe("client-id-123");
    expect(paypalButtonProps.amount).toBe("50.00");
  });

  test("should correctly structure LernerSignUPFormValues", () => {
    const lernerSignUpFormValues: LernerSignUPFormValues = {
      name: "John Doe",
      email: "john@example.com",
      confirmEmail: "john@example.com",
      country: "USA",
      grade: "10th",
      phoneNumber: "123-456-7890",
    };

    expect(lernerSignUpFormValues.name).toBe("John Doe");
    expect(lernerSignUpFormValues.email).toBe("john@example.com");
    expect(lernerSignUpFormValues.confirmEmail).toBe("john@example.com");
    expect(lernerSignUpFormValues.country).toBe("USA");
    expect(lernerSignUpFormValues.grade).toBe("10th");
    expect(lernerSignUpFormValues.phoneNumber).toBe("123-456-7890");
  });
});
