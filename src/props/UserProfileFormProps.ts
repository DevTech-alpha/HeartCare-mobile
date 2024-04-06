interface UserProfileFormProps {
  username: string;
  name: string;
  lastName: string;
  email: string;
  dob: string;
  number : string;
  bloodType: string;
  hasMedicalCondition: string;
  genero: string;
  setUsername: (text: string) => void;
  setName: (text: string) => void;
  setLastName: (text: string) => void;
  setEmail: (text: string) => void;
  setDob: (text: string) => void;
  setNumber: (text: string) => void;
  setBloodType: (text: string) => void;
  setHasMedicalCondition: (text: string) => void;
  setGenero: (text: string) => void;
  handleSaveProfile: () => void;
  loading: boolean;
}

export default UserProfileFormProps;
