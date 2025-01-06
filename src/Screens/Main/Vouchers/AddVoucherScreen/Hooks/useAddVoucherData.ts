import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'

import {Screen} from '@/Helpers'
import SVGByteCode from '@/Helpers/SVGByteCode'

export default () => {
  const {t} = useTranslation()
  return useMemo(
    () => [
      {
        title: t('erp33'),
        data: [
          {title: t('erp33'), svg: SVGByteCode.add_voucher, path: Screen.PurchaseScreen},
          {title: t('erp34'), svg: SVGByteCode.calender},
          {title: t('erp35'), svg: SVGByteCode.calculator},
          {title: t('erp36'), svg: SVGByteCode.stock},
          {title: t('erp37'), svg: SVGByteCode.stock}
        ]
      },
      {
        title: t('erp38'),
        data: [
          {title: t('erp38'), svg: SVGByteCode.add_voucher},
          {title: t('erp39'), svg: SVGByteCode.calender},
          {title: t('erp40'), svg: SVGByteCode.calculator},
          {title: t('erp41'), svg: SVGByteCode.stock},
          {title: t('erp42'), svg: SVGByteCode.stock}
        ]
      },
      {
        title: t('erp43'),
        data: [
          {title: t('erp44'), svg: SVGByteCode.add_voucher},
          {title: t('erp45'), svg: SVGByteCode.calender},
          {title: t('erp46'), svg: SVGByteCode.calculator},
          {title: t('erp47'), svg: SVGByteCode.stock},
          {title: t('erp48'), svg: SVGByteCode.stock},
          {title: t('erp49'), svg: SVGByteCode.stock},
          {title: t('erp50'), svg: SVGByteCode.stock}
        ]
      }
    ],
    [t]
  )
}
