// App related data
export const details = {
  name: 'quick-pkt',
  version: '0.0.0',
};

// LocalStorage related functions
const ls = {
  get: (item: string) => {
    return localStorage.getItem(details.name + item);
  },
  set: (item: string, data: string) => {
    return localStorage.setItem(details.name + item, data);
  },
  clear: () => {
    for (let elem in localStorage) {
      if (elem.startsWith(details.name)) localStorage.removeItem(elem);
    }
  },
  getJsonFn: (item: string) => {
    return function () {
      return JSON.parse(ls.get(item) || '{}');
    };
  },
};

export default ls;

export function blank_fn() {}

export function delay(callback: Function, time = 150) {
  setTimeout(callback, time);
}

export function delayFn(callback: Function, time = 150) {
  return function () {
    setTimeout(callback, time);
  };
}

export function phoneNumberValidation(phone: string) {
  if (phone.length === 0)
    return {
      status: false,
      message: 'Phone number is required',
    };
  if (phone.length !== 10)
    return {
      status: false,
      message: 'Phone number must be 10 digits long',
    };
  const regex = /^[6-9]\d{9}$/;
  return {
    status: regex.test(phone),
    message: 'Invalid phone number',
  };
}
