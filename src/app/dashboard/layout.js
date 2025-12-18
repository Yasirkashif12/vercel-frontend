export const metadata = {
  title: "Dashboard - AI Notes Summarizer",
  description:
    "Summarize your notes with AI and extract action items, risks, and next steps",
};
export default function DashboardLayout({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </main>
  );
}
