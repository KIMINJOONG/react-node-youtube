import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import videoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./components/views/SubscriptionPage/SubscriptionPage";

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={Auth(LandingPage, null, null)}
                    />
                    <Route
                        exact
                        path="/login"
                        component={Auth(LoginPage, false)}
                    />
                    <Route
                        exact
                        path="/register"
                        component={Auth(RegisterPage, false)}
                    />
                    <Route
                        exact
                        path="/video/upload"
                        component={Auth(videoUploadPage, true)}
                    />
                    <Route
                        exact
                        path="/video/:videoId"
                        component={Auth(VideoDetailPage, null)}
                    />
                    <Route
                        exact
                        path="/subscription"
                        component={Auth(SubscriptionPage, null)}
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
