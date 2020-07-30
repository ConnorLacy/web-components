import { p as patchBrowser, b as bootstrapLazy } from './index-ead04436.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["check-box",[[1,"check-box",{"checked":[1028]},[[8,"changed","handleChanged"]]]]]], options);
});
