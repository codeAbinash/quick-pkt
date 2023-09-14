import images from '../assets/images/images';
import Button from '../components/Button';

const Home = () => {
  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limiting the input to 10 digits
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10);
    }
  };

  return (
    <div className='screen flex flex-col items-center justify-between dark:bg-black'>
      <p></p>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full items-center justify-center pt-10'></div>
        <p className='text-center text-4xl font-semibold'>
          Welcome to
          <img src={images.logo_long} className='mx-auto w-60 pb-5 pt-5' />
          {/* <span className='text-accent'>
            <br /> Quick PKT{' '}
          </span> */}
        </p>
        {/* <p className='text-3xl font-medium'>
          <span className='text-accent'>Hey</span> Champ
          <span className='pl-1.5'>
            <TextEmoji emoji='👋🏻' />
          </span>
        </p> */}
        {/* <p className='text-lg'>
          Welcome to <span className='text-accent'>Quick PKT</span>
        </p> */}
        <p className='text-center'>Recharge, Relax, and Redeem Rewards!</p>
      </div>

      <div className='mx-auto flex w-full max-w-lg flex-col gap-6'>
        <p className='text-center text-sm'>
          Enter your <span className='text-accent'>Phone Number</span> to get started
        </p>
        <div className='flex w-full items-center justify-center rounded-btn bg-inputBg pl-4 text-btn dark:bg-white/10'>
          <p className='pr-1'>+91</p>
          <div className=' darkL mx-2 h-[1.5em] w-0.5 bg-gray-300 dark:bg-white/20'></div>
          <input
            type='tel'
            className='w-full border-none bg-transparent p-4 pl-1 caret-accent outline-none'
            placeholder='9876 543 210'
            maxLength={10}
            onChange={handelInput}
          />
        </div>
        <Button className='btn w-full'>
          <p className=''>Send OTP</p>
        </Button>
      </div>
      <div>
        <p className='text-center text-xxs text-gray-500 dark:text-gray-400'>
          Read <span className='text-accent'>Privacy Policy</span> and{' '}
          <span className='text-accent'>Terms of Service</span> before use
        </p>
      </div>
    </div>
  );
};

export default Home;
