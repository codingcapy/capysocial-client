
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: protected route for social platform 1 project
 */

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAllowed, redirectPath = "/login", children }) {
    return isAllowed ? children : <Navigate to={redirectPath} replace />
}