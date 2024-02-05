interface UserProfileFormProps {
  username: string;
  name: string;
  lastName: string;
  email: string;
  dob: string;
  setUsername: (text: string) => void;
  setName: (text: string) => void;
  setLastName: (text: string) => void;
  setEmail: (text: string) => void;
  setDob: (text: string) => void;
  handleSaveProfile: () => void;
  loading: boolean;
}

export default UserProfileFormProps;