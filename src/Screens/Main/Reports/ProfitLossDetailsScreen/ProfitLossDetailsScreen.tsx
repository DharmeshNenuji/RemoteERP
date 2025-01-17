import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, StyleSheet, Text, View} from 'react-native'

import {AppContainer, LoadingView} from '@/Components'
import AppHeader from '@/Components/AppHeader/AppHeader'
import {HttpCodes, InitialsAPICall, type Screen} from '@/Helpers'
import {moderateScale, scale, verticalScale} from '@/Helpers/Responsive'
import {useRoute} from '@/Hooks'
import {APICall, EndPoints} from '@/Network'
import {Colors, CommonStyle, Fonts} from '@/Theme'

import ProfileLossRenderItem from './Components/ProfileLossRenderItem'

export type ProfileLossDetailsType = {
  sales: number
  dir_ex: number
  net_pl: number
  dir_inc: number
  gross_pl: number
  indir_ex: number
  purchase: number
  indir_inc: number
  accs_array: Array<[number, string, string, number]>
  items_array: Array<[number, string, number, number, number, number]>
  closing_stock: number
  opening_stock: number
  stock_balances_array: any
}

export default memo(() => {
  const {t} = useTranslation()
  const {
    params: {fromdate, site_id, todate, has_inv}
  } = useRoute<Screen.ProfitLossDetailsScreen>()
  const [isLoading, setIsLoading] = useState(true)
  const [profileLossDetails, setProfileLoss] = useState<ProfileLossDetailsType | null>(null)

  const getProfitLossDetails = useCallback(() => {
    setIsLoading(true)

    APICall('get', {fromdate, site_id, todate, has_inv}, EndPoints.getProfitLoss)
      .then((resp) => {
        if (resp.status === HttpCodes.OK && resp?.data) {
          setProfileLoss(resp?.data)
        }

        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [fromdate, has_inv, site_id, todate])

  useEffect(() => {
    getProfitLossDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderProfitLossDetailsView = useMemo(() => {
    const [costCenter] = InitialsAPICall.getMasterCostCenter(site_id)

    return (
      <View style={styles.detailsContainer}>
        <Text style={[styles.tableTextStyle, styles.bigText]}>{costCenter?.cost_center_name}</Text>
        <View style={styles.divider} />
        <View>
          <Text style={styles.headerText}>Period:</Text>
          <Text style={styles.tableTextStyle}>
            {fromdate} - {todate}
          </Text>
        </View>
      </View>
    )
  }, [fromdate, site_id, todate])

  const renderDetailsView = useMemo(() => {
    return (
      <ScrollView contentContainerStyle={styles.contentStyle}>
        {profileLossDetails?.opening_stock && (
          <ProfileLossRenderItem
            value={profileLossDetails?.opening_stock}
            data={profileLossDetails?.items_array || []}
            label={t('erp135')}
          />
        )}
        {profileLossDetails?.purchase && (
          <ProfileLossRenderItem
            value={profileLossDetails?.purchase}
            data={profileLossDetails?.items_array || []}
            label={t('erp33')}
          />
        )}
        {profileLossDetails?.dir_ex && (
          <ProfileLossRenderItem
            value={profileLossDetails?.dir_ex}
            data={profileLossDetails?.items_array || []}
            label={t('erp54')}
          />
        )}
        {profileLossDetails?.sales && (
          <ProfileLossRenderItem
            value={profileLossDetails?.sales}
            data={profileLossDetails?.items_array || []}
            label={t('erp136')}
          />
        )}
        {profileLossDetails?.dir_inc && (
          <ProfileLossRenderItem
            value={profileLossDetails?.sales}
            data={profileLossDetails?.items_array || []}
            label={t('erp56')}
          />
        )}
        {profileLossDetails?.closing_stock && (
          <ProfileLossRenderItem
            value={profileLossDetails?.closing_stock}
            data={profileLossDetails?.items_array || []}
            label={t('erp137')}
          />
        )}
        {profileLossDetails?.gross_pl && (
          <ProfileLossRenderItem
            value={profileLossDetails?.gross_pl}
            data={[]}
            nonExpand
            label={t('erp138')}
          />
        )}
        {profileLossDetails?.indir_ex && (
          <ProfileLossRenderItem
            value={profileLossDetails?.indir_ex}
            data={profileLossDetails?.items_array || []}
            label={t('erp55')}
          />
        )}
        {profileLossDetails?.indir_inc && (
          <ProfileLossRenderItem
            value={profileLossDetails?.indir_inc}
            data={profileLossDetails?.items_array || []}
            label={t('erp57')}
          />
        )}
        {profileLossDetails?.net_pl && (
          <ProfileLossRenderItem
            value={profileLossDetails?.net_pl}
            data={[]}
            nonExpand
            label={t('erp139')}
          />
        )}
      </ScrollView>
    )
  }, [profileLossDetails, t])

  return (
    <AppContainer barStyle="dark-content" statusbarColor={Colors.white}>
      <AppHeader backgroundColor={Colors.white} textColor={Colors.blackShade14} title={t('erp8')} />
      <View style={styles.container}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <>
            {renderProfitLossDetailsView}
            {renderDetailsView}
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
    rowGap: verticalScale(10)
  },
  contentStyle: {
    padding: scale(10),
    rowGap: verticalScale(10)
  },
  detailsContainer: {
    borderRadius: moderateScale(10),
    ...CommonStyle.shadow,
    marginHorizontal: scale(10),
    marginTop: scale(10),
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
