import type { ReactNode } from "react";
import ThemeRegistry from "@/src/theme/ThemeRegistry";

export const metadata = {
  title: "Dice Game",
  description: "Dice game test task",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
