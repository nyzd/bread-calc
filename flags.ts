import { flag } from 'flags/next';
 
export const betaLink = flag({
  key: 'beta-link',
  description: "beta link show?",
  decide() {
    return true;
  },
});