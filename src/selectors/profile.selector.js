import {createSelector} from 'reselect'


const profile = state => state.profile;

export const getProfileSelector = createSelector(profile, (profile) => profile);