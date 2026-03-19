import StoreProvider from "../components/storeProvider";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Add suppressHydrationWarning here */}
      <body className="antialiased" suppressHydrationWarning>
        <StoreProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}