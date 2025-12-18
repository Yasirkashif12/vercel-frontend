export const metadata = {
  title: "Auth - AI Notes Summarizer",
  description: "Login or sign up to your account",
};

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </main>
  );
}
