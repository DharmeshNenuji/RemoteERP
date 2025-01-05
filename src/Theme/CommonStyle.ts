import {StyleSheet} from 'react-native'

import Colors from './Colors'

export default StyleSheet.create({
  centerFlex: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  flex: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  shadow: {
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  }
})
