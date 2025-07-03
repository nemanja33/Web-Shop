import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import Header from "./components/header";
import Footer from "./components/footer";

import type { Route } from "./+types/root";
import "./app.css";
import "./styles.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 container mx-auto flex flex-col items-center justify-center">
      <Outlet />
      </main>
      <Footer />
    </div>
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong!";
  let details = "An unexpected error occurred. Please try again later.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page Not Found" : "Error";
    details =
      error.status === 404
        ? "The page you are looking for does not exist."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 container mx-auto flex flex-col items-center justify-center">
        <div className="p-8 max-w-lg text-center">
          <h1 className="text-5xl font-extrabold mb-6">{message}</h1>
          <p className="text-lg mb-4">{details}</p>
          {stack && (
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
              <code>{stack}</code>
            </pre>
          )}
          <Link
            to="/"
            className="mt-6 inline-block bg-white text-red-700 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}