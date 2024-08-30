import apiEndPoint from "./endpoint"; // Adjust the import path as necessary

describe("API Endpoints", () => {
  test("should have correct static endpoint paths", () => {
    expect(apiEndPoint.users).toBe("/users/signup");
    expect(apiEndPoint.parentSignUp).toBe("/users/parentSignUp");
    expect(apiEndPoint.learnerSignUp).toBe("/users/learnerSignUp");
    expect(apiEndPoint.login).toBe("/users/signin");
    expect(apiEndPoint.resetPassword).toBe("/users/resetPassword");
    expect(apiEndPoint.sendMailforResetPassword).toBe("/users/sendMailforResetPassword");
    expect(apiEndPoint.forgetpassword).toBe("/users/");
    expect(apiEndPoint.verifyEmail).toBe("/users/verifyMail");
    expect(apiEndPoint.createAdmin).toBe("/users/createAdmin");
    expect(apiEndPoint.createTeacher).toBe("/users/createTeacher");
    expect(apiEndPoint.getAllAdmins).toBe("/users/getAllAdmins");
    expect(apiEndPoint.getAllTeachers).toBe("/users/getAllTeachers");
    expect(apiEndPoint.getAllStudents).toBe("/users/getAllStudents");
    expect(apiEndPoint.createPaymentModel).toBe("/paymentModels");
    expect(apiEndPoint.getPaymentModels).toBe("/paymentModels");
    expect(apiEndPoint.getGrades).toBe("/grades/");
    expect(apiEndPoint.payment).toBe("/payments/");
  });

  test("should return correct dynamic endpoint paths", () => {
    const userId = "12345";
    expect(apiEndPoint.userById(userId)).toBe(`/users/${userId}`);
    
    const adminId = "admin123";
    expect(apiEndPoint.updateAdmin(adminId)).toBe(`/users/updateAdmin/${adminId}`);
    expect(apiEndPoint.deleteAdmin(adminId)).toBe(`/users/deleteAdmin/${adminId}`);

    const teacherId = "teacher123";
    expect(apiEndPoint.updateTeacher(teacherId)).toBe(`/users/updateTeacher/${teacherId}`);
    expect(apiEndPoint.deleteTeacher(teacherId)).toBe(`/users/deleteTeacher/${teacherId}`);
    
    const paymentModelId = "payment123";
    expect(apiEndPoint.updatePaymentModel(paymentModelId)).toBe(`/paymentModels/${paymentModelId}`);
  });
});
