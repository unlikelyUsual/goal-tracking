import { Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "react-day-picker/dist/style.css";
import Navbar from "./components/Layout/Navbar";
import Provider from "./components/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <Provider>
            <Flex direction={"column"} minHeight={"100svh"}>
              <Navbar />
              {children}
            </Flex>
          </Provider>
        </Theme>
      </body>
    </html>
  );
}
