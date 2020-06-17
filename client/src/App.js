import Loading from "Components/loading";
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import Store from "Store";
import EventSourceTool from "Utils/eventSource";
import Tools from "Utils/tools";

const HomeRoute = lazy(() => import("Layouts/index/index.demo"));
export default function App(props) {
  Tools.fingerprint(function(hash) {
    new EventSourceTool(hash);
  });
  return (
    <Provider store={Store}>
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <Route exact path="/" component={HomeRoute} />
        </Suspense>
      </HashRouter>
    </Provider>
  );
}
