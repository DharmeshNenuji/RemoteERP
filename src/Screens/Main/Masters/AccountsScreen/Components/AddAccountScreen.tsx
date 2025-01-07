import React from 'react'
import {useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {AppInput} from '@/Components'
import {Colors} from '@/Theme'

export default () => {
  const {control} = useForm()
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <AppInput name="Name" control={control} />
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeBackground,
    flex: 1
  }
})
