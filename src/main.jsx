import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { ParallaxProvider } from "react-scroll-parallax";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <main className="purple-dark text-foreground bg-background">
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </main>
  </NextUIProvider>
);
