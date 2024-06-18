// App.js
import { CssVarsProvider } from '@mui/joy';
import './App.scss';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import theme from './Theme.jsx';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Laborbotpage from './pages/Laborbotpage/Laborbotpage.jsx';
import Loginpage from "./pages/LoginPage/Login.jsx";
import Headshot from "./pages/headshot/headshot.jsx";
import ProtectedRoute from './pages/LoginPage/ProtectedRoute.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebaseauth.js";
import LogoutButton from '../src/components/Logout/Logout.jsx';
import FourOFour from "./pages/Fourofour/Fourofour.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
    const [user, loading] = useAuthState(auth);
    console.log("Is there a user logged in ? : ", user);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/home',
            element: <Home />
        },
        {
            path: '/landing',
            element: (
                <ProtectedRoute>
                    <LandingPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/logout',
            element: <LogoutButton />
        },
        {
            path: '/login',
            element: <Loginpage />
        },
        {
            path: '/uae-labour-laws',
            element: <Laborbotpage />
        },
        {
            path: '/headshot',
            element: <Headshot />
        },
        {
            path: '/404',
            element: <FourOFour />
        },
        {
            path: '*',
            element: <Navigate to="/" />
        },
    ]);

    return (
        <>
            <CssVarsProvider theme={theme}>
                <RouterProvider router={router} />
            </CssVarsProvider>
        </>
    );
}

export default App;
