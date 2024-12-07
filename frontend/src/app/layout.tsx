import { AppProvider } from "../provider";
import Loader from "./components/Loader/index";

//Styles
import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="./globals.css" />
      </head>
      <body>
        <AppProvider>
          <Loader />
          <div>{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
