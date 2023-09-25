import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './Redux/sample';
import './css/index.scss';
import { loadTheme } from './lib/util';
import Home, { HomeScreen } from './screens/Home/Home';
import app from '../app';
import icons from './assets/icons/icons';

loadTheme();
const OTP = lazyWithPreload(() => import('./screens/Login/OTP'));
const EditProfile = lazyWithPreload(() => import('./screens/Profile/EditProfile'));
const Profile = lazyWithPreload(() => import('./screens/Profile/Profile'));
const Login = lazy(() => import('./screens/Login/Login'));
const AboutUs = lazy(() => import('./screens/About/AboutUs'));
const ContactUs = lazy(() => import('./screens/About/ContactUs'));
const Privacy = lazy(() => import('./screens/Legal/Privacy'));
const Terms = lazy(() => import('./screens/Legal/Terms'));
const FAQ = lazy(() => import('./screens/Support/FAQ'));
const Report = lazy(() => import('./screens/Support/Report'));
const Help = lazy(() => import('./screens/Support/Help'));
const DarkMode = lazy(() => import('./screens/Theme/DarkMode'));

OTP.preload();
EditProfile.preload();
Profile.preload();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      ),
      // errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <HomeScreen />,
        },
        {
          path: '/wallet',
          element: (
            <Suspense fallback={<Loading />}>
              <div>Wallet</div>
            </Suspense>
          ),
          errorElement: <Error />,
        },
        {
          path: '/offers',
          element: (
            <Suspense fallback={<Loading />}>
              <div>Offers</div>
            </Suspense>
          ),
          errorElement: <Error />,
        },
        {
          path: '/refer',
          element: (
            <Suspense fallback={<Loading />}>
              <div>Refer</div>
            </Suspense>
          ),
          errorElement: <Error />,
        },
      ],
    },
    {
      path: '/login',
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
      errorElement: <Error />,
    },
    {
      path: '/otp',
      element: (
        <Suspense fallback={<Loading />}>
          <OTP />
        </Suspense>
      ),
      errorElement: <Error />,
    },
    {
      path: '/profile',
      element: (
        <Suspense fallback={<Loading />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: 'profile/edit',
      element: (
        <Suspense fallback={<Loading />}>
          <EditProfile />
        </Suspense>
      ),
    },
    {
      path: '/about_us',
      element: (
        <Suspense fallback={<Loading />}>
          <AboutUs />
        </Suspense>
      ),
    },
    {
      path: '/contact_us',
      element: (
        <Suspense fallback={<Loading />}>
          <ContactUs />
        </Suspense>
      ),
    },
    {
      path: '/privacy_policy',
      element: (
        <Suspense fallback={<Loading />}>
          <Privacy />
        </Suspense>
      ),
    },
    {
      path: '/terms_and_conditions',
      element: (
        <Suspense fallback={<Loading />}>
          <Terms />
        </Suspense>
      ),
    },
    {
      path: '/faqs',
      element: (
        <Suspense fallback={<Loading />}>
          <FAQ />
        </Suspense>
      ),
    },
    {
      path: '/report_a_problem',
      element: (
        <Suspense fallback={<Loading />}>
          <Report />
        </Suspense>
      ),
    },
    {
      path: '/help',
      element: (
        <Suspense fallback={<Loading />}>
          <Help />
        </Suspense>
      ),
    },
    {
      path: '/dark_mode',
      element: (
        <Suspense fallback={<Loading />}>
          <DarkMode />
        </Suspense>
      ),
    },
  ],
  {
    basename: app.base,
  },
);

function Loading() {
  return (
    <div className='screen flex items-center justify-center'>
      <img src={icons.loading} alt='Loading' className='w-10 dark:invert' />
    </div>
  );
}

function Error() {
  return (
    <div className='screen flex items-center justify-center text-center'>
      <p>
        Some Error Occurred <br /> Please Go Back
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <React.Suspense fallback={<Loading />}> */}
      <RouterProvider router={router} />
      {/* </React.Suspense> */}
    </Provider>
  </React.StrictMode>,
);
