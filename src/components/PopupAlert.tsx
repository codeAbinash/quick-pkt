import { useCallback, useEffect } from 'react';
import { usePopupAlertContext } from '../context/PopupAlertContext';

export default function PopupAlert() {
  const { popups, setPopups } = usePopupAlertContext();

  useEffect(() => {
    if (popups.length) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [popups]);

  // Disable back button
  useEffect(() => {
    const disableBackButton = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('popstate', disableBackButton);
    return () => {
      window.removeEventListener('popstate', disableBackButton);
    };
  }, [popups]);

  // Remove the last popup
  const removePopup = useCallback(() => {
    const old = [...popups];
    old.pop();
    setPopups(old);
  }, [popups]);

  const popup = popups[popups.length - 1];

  if (!popups.length) return null;
  return (
    <div className='50 fixed z-[100] flex h-screen w-full select-none items-center justify-center'>
      {/* {popups.map((popup, index) => ( */}
      <div
        // key={index}
        className='w-[85%] rounded-3xl border border-black/10 bg-white/40 shadow-[0px_0px_100vh_100dvh_#00000020] backdrop-blur-lg dark:border-white/10  dark:bg-black/40'
      >
        <div className='p-6 pb-0'>
          <p className='text-md font-normMid'>{popup.title}</p>
          <p className='mt-2 text-[0.8rem]'>{popup.subTitle}</p>
        </div>
        <div className='flex items-center justify-between gap-2 p-4 text-[0.8rem]'>
          {popup.action.map((action, index) => (
            <button
              key={index}
              className={
                action.className +
                ' highlight-none tap95 w-full flex-grow rounded-lg py-3 font-normMid active:bg-inputBg active:dark:bg-white/10'
              }
              onClick={() => {
                removePopup();
                action.onClick && action.onClick();
              }}
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>
      {/* ))} */}
    </div>
  );
}
