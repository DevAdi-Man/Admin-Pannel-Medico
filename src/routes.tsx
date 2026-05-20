import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import { Billing } from "./pages/billing/Billing";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'billing',
                element: <Billing />
            }
        ]
    }
])

export default Router
