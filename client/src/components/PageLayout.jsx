import React from "react";
import { Outlet } from "react-router-dom";
import Bar from "./Bar";

export default function PageLayout({ setAuthenticated }) {
    return (
        <div>
            <Bar setAuthenticated={setAuthenticated} />
            <Outlet />
        </div>
    )
}

