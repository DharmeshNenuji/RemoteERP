import * as AppConfig from 'react-native-config'
// need to provide the type for the config
const Config = (AppConfig.Config as any).getConstants() as {
  [name: string]: string | undefined
}
export default {
  API_URL: Config.API_URL
}
