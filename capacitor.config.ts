import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.turboboost.app',
  appName: 'TurboBoost',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: "#1A1F2C",
    minSdkVersion: 34, // Android 14
    targetSdkVersion: 34,
    buildOptions: {
      keystorePath: 'release-key.keystore',
      keystorePassword: 'turboboost',
      keystoreAlias: 'key0',
      keystoreAliasPassword: 'turboboost',
    }
  }
};

export default config;