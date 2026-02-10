export type Profile = {
  profileName: string;
  avatarUrl: string;
  _id: string;
  userId: string;
};

declare global {
  type User = {
    email: string;
    firstName: string;
    lastName: string;
    roles?: string[];
    profiles?: Profile[];
    activeProfile: Profile;
  };
}
