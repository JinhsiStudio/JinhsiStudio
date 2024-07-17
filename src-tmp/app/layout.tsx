import type { Metadata } from "next";
import "./globals.css";
import RootLayoutPage from "../components/root/layout";

export const metadata: Metadata = {
    title: "Jinhsi Studio",
    description: "A toolbox of Wuthering Waves",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html>
            <body><RootLayoutPage>{children}</RootLayoutPage></body>
        </html>
    );
}

