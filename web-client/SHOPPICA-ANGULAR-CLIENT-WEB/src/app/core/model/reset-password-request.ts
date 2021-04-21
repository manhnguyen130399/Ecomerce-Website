export interface ResetPasswordRequest {
  email: string;
  databaseToken: string;
  newPassword: string;
  confirmPassword: string;
}
