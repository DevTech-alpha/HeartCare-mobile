interface UserProfileFormProps {
  username: string;
  name: string;
  lastName: string;
  dob: string;
  email: string;
  setUsername: (text: string) => void;
  setName: (text: string) => void;
  setLastName: (text: string) => void;
  setDob: (text: string) => void;
  setEmail: (text: string) => void;
  handleSaveProfile: () => void;
  loading: boolean;
}

export default UserProfileFormProps;