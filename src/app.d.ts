export { };

declare global {

  type UserType = {
    displayName: string | null
    photoURL: string | null;
    uid: string;
    email: string | null;
  };

  type UserState = {
    loading: boolean,
    data: UserType | null
  };

  type TodoDoc = {
    id: string;
    uid: string;
    text: string;
    complete: boolean;
    createdAt: Date;
  };

  type AboutDoc = {
    name: string;
    description: string;
  };

}
