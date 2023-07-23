/* eslint-disable no-console */

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    video: false,
    setupNodeEvents(on /* , config */) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    }
  }
});
