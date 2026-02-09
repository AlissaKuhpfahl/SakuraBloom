export type Profile = {
  profileName: string;
  avatarUrl: string;
};

declare global {
  type User = {
    email: string;
    firstName: string;
    lastName: string;
    roles?: string[];
    profiles?: Profile[];
  };
}
