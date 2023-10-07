import { configureStore } from '@reduxjs/toolkit';

import bannerSlice from './banners';
import featuredSlice from './featured';
import namesSlice from './names';
import profileSlice from './profile';
import settingsSlice from './settings';
import spotlightsSlice from './spotlights';
import mobileRechargeSlice from './mobileRecharge';

const store = configureStore({
  reducer: {
    names: namesSlice,
    banners: bannerSlice,
    spotlights: spotlightsSlice,
    featured: featuredSlice,
    profile: profileSlice,
    settings: settingsSlice,
    mobileRecharge: mobileRechargeSlice,
  },
});
export default store;
