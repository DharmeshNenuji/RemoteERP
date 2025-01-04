module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@': './src'
        }
      }
    ]
  ]
}
