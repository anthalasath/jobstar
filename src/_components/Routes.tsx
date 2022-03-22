// pages
import Home from "../_pages/Home";
import Profile from "../_pages/Profile";
import Achievements from "../_pages/Achievements";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'profile-route',
        title: 'Profile',
        path: '/profile',
        enabled: true,
        component: Profile
    },
    {
        key: 'achievements-route',
        title: 'Achievements',
        path: '/achievements',
        enabled: true,
        component: Achievements
    }
]