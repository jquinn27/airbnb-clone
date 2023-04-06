import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";

import ToasterProvider from "./providers/ToasterProvider";

const RegisterModal = dynamic(
  () => import("./components/modals/RegisterModal"),
  { ssr: false }
);
const LoginModal = dynamic(() => import("./components/modals/LoginModal"), {
  ssr: false,
});

const RentModal = dynamic(() => import("./components/modals/RentModal"), {
  ssr: false,
});

import getCurrentUser from "./actions/getCurrentUser";

import dynamic from "next/dynamic";

export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb clone created with Next 13",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
