import { flag } from 'flags/next';
 
export const betaLink = flag({
  key: 'beta-link',
  decide() {
    return true;
  },
});