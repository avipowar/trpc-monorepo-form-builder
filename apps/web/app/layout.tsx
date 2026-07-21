import type { Metadata } from "next";
import { GlobalProviders } from "~/providers/global";
import { ThemeProvider } from "~/components/providers/theme-provider"; 
import "./globals.css";

export const metadata: Metadata = {
  title: "Tokyo Night Form Builder",
  description: "A premium Japanese Zen Minimalist Typeform Clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GlobalProviders>{children}</GlobalProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
