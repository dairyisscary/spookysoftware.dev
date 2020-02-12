import "@/global.scss";
import "prismjs/themes/prism-tomorrow.css";

export const onRouteUpdate = ({ location }) => {
  if (
    process.env.NODE_ENV === "production" &&
    typeof window.fathom === "function" &&
    location.hostname === "www.spookysoftware.dev"
  ) {
    window.fathom("trackPageview");
  }
};
