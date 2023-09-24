import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import { Bottom, Header } from '../../components/Extras';
import ls, { blank_fn } from '../../lib/util';
import { useMemo, useState } from 'react';
import transitions from '../../lib/transition';
import { getProfileInfo } from './utils';

type Option = {
  name: string;
  icon: string;
  onClick?: Function;
  className?: string;
  classNameIcon?: string;
  link?: string;
};
type OptionGroup = {
  groupName: string;
  options: Option[];
};
const options = [
  {
    groupName: 'Account',
    options: [
      {
        name: 'Edit Profile',
        icon: icons.edit,
        link: '/profile/edit',
        classNameIcon: 'anim-edit-icon',
      },
      {
        name: 'Log Out',
        icon: icons.log_out,
        className: 'text-red-500',
        classNameIcon: '',
      },
    ],
  },
  {
    groupName: 'System',
    options: [
      {
        name: 'Dark Mode',
        icon: icons.dark_mode,
        link: '/dark_mode',
      },
      {
        name: 'Language',
        icon: icons.language,
      },
    ],
  },
  {
    groupName: 'Support',
    options: [
      {
        name: 'Help',
        icon: icons.help,
        link: '/help',
      },
      {
        name: 'Report a Problem',
        icon: icons.report,
        link: '/report_a_problem',
      },
      {
        name: 'Rate Us',
        icon: icons.rate,
        // link : 'https'
      },
      {
        name: 'FAQs',
        icon: icons.help,
        link: '/faqs',
      },
    ],
  },
  {
    groupName: 'Legal',
    options: [
      {
        name: 'Terms and Conditions',
        icon: icons.terms,
        link: '/terms_and_conditions',
      },
      {
        name: 'Privacy Policy',
        icon: icons.privacy_policy,
        link: '/privacy_policy',
      },
    ],
  },
  {
    groupName: 'About',
    options: [
      {
        name: 'About Us',
        icon: icons.about_us,
        link: '/about_us',
      },
      {
        name: 'Contact Us',
        icon: icons.contact_us,
        link: '/contact_us',
      },
    ],
  },
];

// {
//   "status": true,
//   "data": {
//     "id": 1,
//     "first_name": null,
//     "last_name": null,
//     "mobile_number": "9547400680",
//     "email": null,
//     "created_at": "2023-09-20T06:55:58.000000Z",
//     "updated_at": "2023-09-20T06:55:58.000000Z"
//   },
//   "filled_required": true,
//   "message": "User Retrived"
// }

export default function Profile() {
  const profile = useMemo(getProfileInfo, []);
  // const profile = {
  //   status: true,
  //   data: {
  //     id: 1,
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     mobile_number: '9547400680',
  //     email: 'cod',
  //   },
  // };
  console.log(profile);
  const [firstName, setFirstName] = useState(profile.data.first_name || 'Your');
  const [lastName, setLastName] = useState(profile.data.last_name || 'Name');
  const [mobile, setMobile] = useState('+91 ' + profile.data.mobile_number);
  const navigate = useNavigate();
  return (
    <div className='select-none'>
      <Header onclick={transitions(() => navigate('/', { replace: true }))}>
        <p className='font-normMid'>More Options</p>
      </Header>
      <div className='mt-5'>
        <div className='relative mx-auto mb-4 max-w-lg'>
          <img src={icons.user} className='profile-picture mx-auto w-1/3 rounded-full' />
        </div>
      </div>
      <div>
        <p className='anim-user-name text-center text-xl font-semibold'>
          {firstName} {lastName}
        </p>
        <div className='mt-1 flex items-center justify-center gap-2'>
          <p className='anim-user-phone text-sm font-normMid text-gray-500'>{mobile}</p>
        </div>
      </div>

      <div className='mx-auto max-w-lg p-5'>
        {options.map((optionGroup: OptionGroup, i: number) => (
          <div className='mt-5' key={i}>
            <p className='pl-2 text-sm font-normMid text-zinc-500'>{optionGroup.groupName}</p>
            <div className='mt-3 flex flex-col gap-2 rounded-2xl bg-inputBg p-4 dark:bg-white/10'>
              {optionGroup.options.map((option: Option, i: number) => (
                <div
                  className='tap99 flex items-center justify-between p-2 pl-2 pr-0'
                  key={i}
                  onClick={
                    option.link
                      ? transitions(() => navigate(option.link!))
                      : option.onClick
                      ? transitions(() => option.onClick!())
                      : blank_fn
                  }
                >
                  <div className='flex w-full items-center justify-between gap-6'>
                    <div className='flex items-center gap-5'>
                      <img
                        src={option.icon}
                        alt=''
                        className={`w-5.5 opacity-80 dark:opacity-90 dark:invert ${
                          option.classNameIcon ? option.classNameIcon : ''
                        }`}
                      />
                      <span
                        className={`text-[0.85rem] font-420 opacity-90 ${option.className ? option.className : ''}`}
                      >
                        {option.name}
                      </span>
                    </div>
                    <img src={icons.arrow_right} className='w-5 opacity-50 dark:invert' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Bottom />
    </div>
  );
}
