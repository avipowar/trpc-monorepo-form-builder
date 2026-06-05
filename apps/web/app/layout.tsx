import type { Metadata } from "next";
import { GlobalProviders } from "~/providers/global";

export const metadata: Metadata = {
  title: "Tokyo Night Form Builder",
  description: "A premium Japanese Zen Minimalist Typeform Clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
