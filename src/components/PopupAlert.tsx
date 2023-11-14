import { useCallback, useEffect } from 'react';
import { usePopupAlertContext } from '../context/PopupAlertContext';
import transitions from '../lib/transition';

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
    <div className='fixed z-[100] flex h-screen w-full select-none items-center justify-center'>
      <div className='w-[85%] max-w-sm rounded-3xl border border-white/10 bg-neutral-900/80 shadow-[0px_0px_100vh_100dvh_#00000075,0_0_10px_10px_#00000005] backdrop-blur-lg'>
        <div className='p-6 pb-0'>
          <div className='text-md font-normMid'>{popup.title}</div>
          <div className='mt-2 text-[0.8rem]'>{popup.subTitle}</div>
        </div>
        <div className='flex items-center justify-between gap-3.5 p-4 text-[0.8rem]'>
          {popup.action?.map((action, index) => (
            <button
              key={index}
              className={
                action.className + ' highlight-none tap97 w-full flex-grow rounded-lg bg-white/5 py-3.5 font-normMid'
              }
              onClick={() => {
                transitions(removePopup, 0)();
                action.onClick && action.onClick();
              }}
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
