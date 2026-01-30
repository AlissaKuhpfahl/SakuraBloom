declare global {
  type User = {
    email: string;
    firstName: string;
    lastName: string;
    roles?: string[];
  };
}
