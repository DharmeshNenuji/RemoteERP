import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'

import {Screen} from '@/Helpers'
import SVGByteCode from '@/Helpers/SVGByteCode'

export type DashboardItemType = {
  title: string
  svg: string
  path?: keyof typeof Screen
}

export default () => {
  const {t} = useTranslation()

  return useMemo(
    () => [
      {
        title: t('erp1'),
        data: [
          {title: t('erp6'), svg: SVGByteCode.add_voucher},
          {title: t('erp7'), svg: SVGByteCode.calender},
          {title: t('erp8'), svg: SVGByteCode.calculator, path: Screen.LedgerScreen},
          {title: t('erp9'), svg: SVGByteCode.stock}
        ]
      },
      {
        title: t('erp2'),
        data: [
          {title: t('erp10'), svg: SVGByteCode.accounts, path: Screen.AccountsScreen},
          {title: t('erp11'), svg: SVGByteCode.items},
          {title: t('erp12'), svg: SVGByteCode.sites}
        ]
      },
      {
        title: t('erp3'),
        data: [
          {title: t('erp6'), svg: SVGByteCode.add_voucher, path: Screen.AddVoucherScreen},
          {title: t('erp14'), svg: SVGByteCode.calender},
          {title: t('erp15'), svg: SVGByteCode.filter},
          {title: t('erp16'), svg: SVGByteCode.off_voucher}
        ]
      },
      {
        title: t('erp4'),
        data: [
          {title: t('erp17'), svg: SVGByteCode.cart},
          {title: t('erp18'), svg: SVGByteCode.modulus},
          {title: t('erp19'), svg: SVGByteCode.receipt},
          {title: t('erp20'), svg: SVGByteCode.delivery},
          {title: t('erp21'), svg: SVGByteCode.order},
          {title: t('erp22'), svg: SVGByteCode.checkList}
        ]
      },
      {
        title: t('erp5'),
        data: [
          {title: t('erp8'), svg: SVGByteCode.calculator, path: Screen.LedgerScreen},
          {title: t('erp9'), svg: SVGByteCode.stock},
          {title: t('erp25'), svg: SVGByteCode.profit, path: Screen.ProfitLossScreen},
          {title: t('erp26'), svg: SVGByteCode.balance},
          {title: t('erp27'), svg: SVGByteCode.trialSheet},
          {title: t('erp28'), svg: SVGByteCode.summary},
          {title: t('erp29'), svg: SVGByteCode.bill},
          {title: t('erp30'), svg: SVGByteCode.pending_orders}
        ]
      }
    ],
    [t]
  )
}
