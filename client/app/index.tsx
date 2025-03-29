import SignInScreen from '../components/SignInScreen';

export default function Home() {
  const handleSignIn = (username: string) => {
    // Here you can handle the sign in logic
    console.log(`User ${username} signed in`);
  };

  return <SignInScreen onSignIn={handleSignIn} />;
} 