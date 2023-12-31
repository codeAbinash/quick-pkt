import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { setNotification } from '../../Redux/notifications';
import { setProfile } from '../../Redux/profile';
import store from '../../Redux/store';
import icons from '../../assets/icons/icons';
import { Watermark } from '../../components/Extras';
import TapMotion from '../../components/TapMotion';
import TextEmoji from '../../components/TextEmoji';
import { PopupAlertType, usePopupAlertContext } from '../../context/PopupAlertContext';
import { getCurrentUser, getNotifications } from '../../lib/api';
import headerIntersect from '../../lib/headerIntersect';
import transitions from '../../lib/transition';
import ls from '../../lib/util';
import { UserProfile, setProfileInfoLs } from '../Profile/utils';
import Banner from './components/Banner';
import Featured from './components/Featured';
import Options from './components/Options';
import RechargeOptions from './components/RechargeOptions';
import SpecialOffers from './components/SpecialOffers';
import SpotLight from './components/SpotLight';

function getLoginStatus() {
  return ls.get('isLoggedIn');
}

// function logout() {
//   ls.clear();
//   window.location.reload();
// }

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: icons.home,
    icon_filled: icons.home_filled,
    className: 'w-[21px]',
    className_filled: 'w-[19.5px]',
  },
  {
    name: 'Offers',
    path: '/offers',
    icon: icons.offers,
    icon_filled: icons.offers_filled,
    className: 'w-[23.5px]',
    className_filled: 'w-[23.5px]',
  },
  {
    name: 'Refer',
    path: '/refer',
    icon: icons.send,
    icon_filled: icons.send_filled,
    className: 'w-[23px]',
    className_filled: 'w-[23px]',
  },
  {
    name: 'Wallet',
    path: '/wallet',
    icon: icons.wallet,
    icon_filled: icons.wallet_filled,
    className: 'w-[22.5px]',
    className_filled: 'w-[23.5px]',
  },
];

function FillProfile(newPopup: (popup: PopupAlertType) => void, navigate: Function) {
  newPopup({
    title: (
      <span>
        Profile Incomplete <TextEmoji emoji='😳' />
      </span>
    ),
    subTitle: (
      <span>
        Please fill the profile to continue <TextEmoji emoji='🤗' />. This will help us to serve you better{' '}
        <TextEmoji emoji='🥰' />.
      </span>
    ),
    action: [
      { text: 'Not Now', className: 'text-neutral-500' },
      {
        text: 'Edit Profile',
        className: 'text-accent',
        onClick: transitions(() => navigate('/profile/edit')),
      },
    ],
  });
}

export default function Home() {
  // Check If it is logged in
  const isLoggedIn = useMemo(() => getLoginStatus(), []);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const intersect = useRef<HTMLParagraphElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const profile: UserProfile = useSelector((state: any) => state.profile);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const { newPopup } = usePopupAlertContext();

  const getUserData = useCallback(async function getUserData() {
    const userData = await getCurrentUser();
    if (userData.status) {
      const profile = userData?.data as UserProfile;
      store.dispatch(setProfile(profile));
      setProfileInfoLs(profile);
      if (profile?.filled_required) {
        FillProfile(newPopup, navigate);
      }
    }
  }, []);

  const loadNotifications = useCallback(async function loadNotifications() {
    const notifications = await getNotifications();
    console.log(notifications);
    if (!notifications.status) return;
    store.dispatch(setNotification((notifications?.data?.data?.notifications as Notification[]) || []));
    setIsNewNotification(notifications?.data?.data?.notifications?.length);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { replace: true });
  }, []);

  useEffect(() => {
    headerIntersect(intersect.current as Element, setIsIntersecting);
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className='colors w-full select-none'>
      <p ref={intersect}></p>
      <div
        className={`${
          isIntersecting ? '' : 'shadow-sm shadow-[#00000015] dark:shadow-[#ffffff15]'
        } sticky top-0 z-40 flex w-full items-center justify-between bg-white px-5 py-3.5 dark:bg-black`}
      >
        {/* bg-white/90 backdrop-blur-md dark:bg-black/80*/}
        <div className='flex items-center justify-between gap-2'>
          <img src={icons.thunder} className='h-5.5 pl-1.5' />
          <p className='text-xl font-semibold uppercase text-accent'>Quick PKT</p>
        </div>
        <div className='flex items-center justify-center gap-6'>
          <div className='relative'>
            <img
              src={icons.notification}
              className='tap95 w-[1.2rem] opacity-60 dark:invert'
              onClick={transitions(() => {
                navigate('/notifications');
              })}
            />
            {
              <div
                className={`absolute right-0 top-0 h-2 w-2 rounded-full ${isNewNotification ? 'bg-accent ' : ''}`}
              ></div>
            }
          </div>

          <TapMotion size='sm'>
            <img
              src={profile?.data?.profile_pic || icons.user}
              className='profile-picture aspect-square w-[2.2rem] rounded-full bg-inputBg object-cover dark:bg-white/10'
              onClick={transitions(() => {
                navigate('/profile');
              })}
            />
          </TapMotion>
        </div>
      </div>
      <Outlet />
      <div
        className='fixed bottom-[-1px] left-0 right-0 z-40 flex items-center justify-between border border-t-[0.5px] border-transparent
        border-t-[#77777744] bg-white  px-5 align-middle dark:bg-black md:bottom-4 md:mx-auto md:max-w-sm md:rounded-full md:border-[#77777744]
        md:px-0 md:shadow-lg'
      >
        {/* bg-[#ffffffee] backdrop-blur-md dark:bg-black/90  */}
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`tap95 highlight-none flex flex-grow cursor-pointer flex-col items-center justify-center gap-[0.15rem] pb-2.5 pt-3.5 ${
              path === item.path ? 'text-accent' : 'text-black opacity-50 dark:text-white dark:opacity-40'
            }`}
            onClick={transitions(() => navigate(item.path, { replace: true }), 0)}
          >
            <div className='flex aspect-square h-[25px] items-start justify-center'>
              <img
                className={path === item.path ? item.className_filled : ' dark:invert ' + item.className}
                src={path === item.path ? item.icon_filled : item.icon}
              />
            </div>
            <span className='text-center text-[0.65rem] font-normMid'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className='flex w-full flex-col gap-5 pb-32 pt-2'>
      <Banner />
      <SpecialOffers />
      <RechargeOptions />
      <Options />
      <SpotLight />
      <Featured />
      <Watermark />
    </div>
  );
}
