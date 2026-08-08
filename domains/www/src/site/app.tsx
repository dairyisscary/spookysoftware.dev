import { Loading } from "solid-js";

import "#/site/favicon.png?no-inline"; // Be sure to include the favicon in the bundle

import "#/site/app.css";
import { Router } from "#/site/navigation";

export default function App() {
  return <Router>{(props) => <Loading>{props.children}</Loading>}</Router>;
}
