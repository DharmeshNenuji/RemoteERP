import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'

import {AppContainer, LoadingView} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {HttpCodes, InitialsAPICall, type Screen} from '@/Helpers'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {useRoute} from '@/Hooks'
import {APICall, EndPoints} from '@/Network'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import LedgerTable from './Components/LedgerTable'

export default memo(() => {
  const {t} = useTranslation()
  const {
    params: {acc_id, fromdate, site_id, todate}
  } = useRoute<Screen.LedgerDetailsScreen>()
  const [isLoading, setIsLoading] = useState(true)
  const [ledgerDetails, setLedgerDetails] = useState<string[][]>([])

  const getLedgerDetails = useCallback(() => {
    setIsLoading(true)

    APICall('get', {acc_id, fromdate, site_id, todate}, EndPoints.getLedger)
      .then((resp) => {
        if (resp.status === HttpCodes.OK && resp?.data) {
          setLedgerDetails(resp?.data)
        }

        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [acc_id, fromdate, site_id, todate])

  useEffect(() => {
    getLedgerDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderLedgerDetailsView = useMemo(() => {
    const account = InitialsAPICall.findItemByType(acc_id, 'account')
    const costCenter = InitialsAPICall.findItemByType(site_id, 'costCenter')

    return (
      <View style={styles.detailsContainer}>
        <Text style={[styles.tableTextStyle, styles.bigText]}>{costCenter?.title}</Text>
        <View style={styles.divider} />
        <View>
          <Text style={styles.headerText}>Account:</Text>
          <Text style={styles.tableTextStyle}>{account?.title}</Text>
        </View>
        <View>
          <Text style={styles.headerText}>Period:</Text>
          <Text style={styles.tableTextStyle}>
            {fromdate} - {todate}
          </Text>
        </View>
      </View>
    )
  }, [acc_id, fromdate, site_id, todate])

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader backgroundColor={Colors.white} textColor={Colors.blackShade14} title={t('erp8')} />
      <View style={styles.container}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <>
            {renderLedgerDetailsView}
            <LedgerTable data={ledgerDetails} />
          </>
        )}
      </View>
    </AppContainer>
  )
})
const styles = StyleSheet.create({
  bigText: {
    fontFamily: Fonts[500],
    fontSize: moderateScale(16)
  },
  container: {
    flex: 1,
    padding: scale(10),
    rowGap: verticalScale(10)
  },
  detailsContainer: {
    borderRadius: moderateScale(10),
    ...CommonStyle.shadow,
    padding: scale(10),
    rowGap: verticalScale(10)
  },
  divider: {
    backgroundColor: Colors.blackShade14Opacity10,
    height: StyleSheet.hairlineWidth,
    width: '100%'
  },
  headerText: {
    color: Colors.blackShade14Opacity10,
    fontFamily: Fonts[400],
    fontSize: moderateScale(14)
  },
  tableTextStyle: {
    color: Colors.blackShade14,
    fontFamily: Fonts[500],
    fontSize: moderateScale(14)
  }
})
