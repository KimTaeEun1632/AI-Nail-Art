import "./globals.css";
import TanStackProvider from "@/providers/TanStackProvider";
import { ImagesProvider } from "@/providers/ImagesProvider";
import { HoverActionProvider } from "@/providers/HoverActionProvider";
import Nav from "@/components/Nav/Nav";
import AuthSession from "@/providers/AuthSessionProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <TanStackProvider>
          <AuthSession>
            <ImagesProvider>
              <HoverActionProvider>
                <Nav />
                <main>{children}</main>
              </HoverActionProvider>
            </ImagesProvider>
          </AuthSession>
        </TanStackProvider>
      </body>
    </html>
  );
}
