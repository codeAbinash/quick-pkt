import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import images from '../../assets/images/images';
import transitions from '../../lib/transition';
import ls from '../../lib/util';

function getLoginStatus() {
  return ls.get('isLoggedIn');
}

function logout() {
  ls.clear();
  window.location.reload();
}

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

export default function Home() {
  // Check If it is logged in
  const isLoggedIn = useMemo(() => getLoginStatus(), []);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // useEffect(() => {
  //   if (!isLoggedIn)
  //     navigate('/login', {
  //       replace: true,
  //     });
  // }, []);
  useEffect(() => {}, []);

  return (
    <div className='w-full select-none'>
      <div className='sticky top-0 flex w-full items-center justify-between border-b-[0.5px] border-transparent border-b-[#77777744] px-4 py-3'>
        <img src={images.logo_long} alt='Logo' className='h-9' />
        <div className='flex items-center justify-center gap-5'>
          <img src={icons.notification} alt='Notification Icon' className='tap95 w-[1.2rem] opacity-60 dark:invert' />
          <img src={icons.user} className='tap95 w-[2.1rem] rounded-full' alt='User Icon' />
        </div>
      </div>
      <Outlet />
      <div
        className='fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border border-t-[0.5px] border-transparent
        border-t-[#77777744] bg-white/70 px-5 align-middle backdrop-blur-md dark:bg-black/60
        md:bottom-4 md:mx-auto md:max-w-sm md:rounded-full md:border-[#77777744] md:px-0 md:shadow-lg'
      >
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
                alt={item.name}
              />
            </div>
            <span className='text-center text-[0.65rem] font-normMid'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const bannerImages = [
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
];

const rechargeOptions = [
  {
    name: 'Mobile',
    icon: icons.postpaid,
  },
  {
    name: 'DTH',
    icon: icons.dth,
  },
  {
    name: 'Electricity',
    icon: icons.electricity,
  },
  {
    name: 'Landline',
    icon: icons.landline,
  },
  {
    name: 'Broadband',
    icon: icons.broadband,
  },
  {
    name: 'Gas Bill',
    icon: icons.gas,
  },
  {
    name: 'Rent',
    icon: icons.rent,
  },
  {
    name: 'Postpaid',
    icon: icons.postpaid,
  },
];

export function HomeScreen() {
  return (
    <div className='w-full pt-5'>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-5'>
        {bannerImages.map((item, index) => (
          <div
            key={index}
            className='tap97 flex w-[80%] shrink-0 snap-center items-center justify-center first:ml-5 last:mr-5'
          >
            <img className='w-full shrink-0 rounded-2xl bg-white shadow-lg' src='/images/banner.webp' />
          </div>
        ))}
      </div>
      <div className='p-4 pt-2'>
        <p className='pl-1.5 text-sm font-normMid'>Recharge and Bill Payments</p>{' '}
        <div className='mt-4 grid grid-cols-4 justify-center gap-y-6 rounded-2xl border border-[#77777744] p-3 pb-7 pt-7 shadow-md shadow-[#00000011]'>
          {rechargeOptions.map((item, index) => (
            <div key={index} className='tap95 flex flex-col items-center justify-center'>
              <div className='aspect-square'>
                <img className='w-[1.7rem]' src={item.icon} alt={item.name} />
              </div>
              <p className='text-gray mt-2 text-[0.7rem] font-normal text-gray-700 dark:text-gray-300'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
