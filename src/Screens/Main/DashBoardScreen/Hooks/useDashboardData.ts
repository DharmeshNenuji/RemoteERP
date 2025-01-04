import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'

import SVGByteCode from '@/Helpers/SVGByteCode'

export default () => {
  const {t} = useTranslation()

  return useMemo(
    () => [
      {
        title: t('erp1'),
        data: [
          {title: t('erp6'), svg: SVGByteCode.add_voucher},
          {title: t('erp7'), svg: SVGByteCode.add_voucher},
          {title: t('erp8'), svg: SVGByteCode.add_voucher},
          {title: t('erp9'), svg: SVGByteCode.add_voucher}
        ]
      },
      {
        title: t('erp2'),
        data: [
          {title: t('erp10'), svg: SVGByteCode.add_voucher},
          {title: t('erp11'), svg: SVGByteCode.add_voucher},
          {title: t('erp12'), svg: SVGByteCode.add_voucher}
        ]
      },
      {
        title: t('erp3'),
        data: [
          {title: t('erp13'), svg: SVGByteCode.add_voucher},
          {title: t('erp14'), svg: SVGByteCode.add_voucher},
          {title: t('erp15'), svg: SVGByteCode.add_voucher},
          {title: t('erp16'), svg: SVGByteCode.add_voucher}
        ]
      },
      {
        title: t('erp4'),
        data: [
          {title: t('erp17'), svg: SVGByteCode.add_voucher},
          {title: t('erp18'), svg: SVGByteCode.add_voucher},
          {title: t('erp19'), svg: SVGByteCode.add_voucher},
          {title: t('erp20'), svg: SVGByteCode.add_voucher},
          {title: t('erp21'), svg: SVGByteCode.add_voucher},
          {title: t('erp22'), svg: SVGByteCode.add_voucher}
        ]
      },
      {
        title: t('erp5'),
        data: [
          {title: t('erp23'), svg: SVGByteCode.add_voucher},
          {title: t('erp24'), svg: SVGByteCode.add_voucher},
          {title: t('erp25'), svg: SVGByteCode.add_voucher},
          {title: t('erp26'), svg: SVGByteCode.add_voucher},
          {title: t('erp27'), svg: SVGByteCode.add_voucher},
          {title: t('erp28'), svg: SVGByteCode.add_voucher},
          {title: t('erp29'), svg: SVGByteCode.add_voucher},
          {title: t('erp30'), svg: SVGByteCode.add_voucher}
        ]
      }
    ],
    [t]
  )
}
