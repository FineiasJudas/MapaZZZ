/*
  Note: The types below are duplicated between this file and `src/specs/PagerViewNativeComponent.ts`.

  This is on purpose. Firstly, we're declaring two native modules with two different iOS implementation flavors, but the same API.
  Secondly, as these files serve as a reference point for React Native's new architecture Codegen process (which takes care of the
  automatic generation of the native modules) we cannot extract the types into a separate file, or declare both native modules
  in one file, as Codegen supports neither of these workarounds at the time of writing.

  In order to make things as intuitive as possible, the duplicated types in this file are *not* exported, as they are meant for use
  in this file only, by Codegen-related functions.
*/

import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
export const Commands = codegenNativeCommands({
  supportedCommands: ['setPage', 'setPageWithoutAnimation', 'setScrollEnabledImperatively']
});
export default codegenNativeComponent('LEGACY_RNCViewPager');
//# sourceMappingURL=LEGACY_PagerViewNativeComponent.js.map