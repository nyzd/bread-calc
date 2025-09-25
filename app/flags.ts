import { flag } from 'flags/next';
 
export const betaLink = flag({
  key: 'beta-link',
  decide() {
    return process.env.NODE_ENV === 'production';
  },
});