
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: router for CapySocial
 */

import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/Home.page";
import { pageLoader } from "./pages/Home.page";
import LoginPage from "./pages/Login.page";
import { PostsPage } from "./pages/Posts.page";
import CreatePostPage from "./pages/CreatePost.page";
import SignupPage from "./pages/Signup.page";
import useAuthStore from "./store/AuthStore";
import NotFound from "./pages/NotFound.page";
import ProtectedRoute from "./services/ProtectedRoute";
import PostDetailsPage, { postDetailsLoader } from "./pages/PostDetails.page";
import ProfilePage, { userPostsLoader } from "./pages/Profile.page";
import MaintenancePage from "./pages/MaintenancePage";

export function Router() {

    const authCheck = useAuthStore((state) => { return state.user ? state.user : false });

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path='/' element={<HomePage />} loader={pageLoader} />
                <Route path='/posts' element={<PostsPage />} loader={pageLoader} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path='/posts/:postId' element={<PostDetailsPage />} loader={postDetailsLoader} />
                <Route path="/posts/create" element={<ProtectedRoute isAllowed={!!authCheck}><CreatePostPage /></ProtectedRoute>} />
                <Route path="/users/:userId" element={<ProtectedRoute isAllowed={!!authCheck}><ProfilePage /></ProtectedRoute>} loader={userPostsLoader} />
                <Route path='/maintenance' element={<MaintenancePage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    )
    return router
}