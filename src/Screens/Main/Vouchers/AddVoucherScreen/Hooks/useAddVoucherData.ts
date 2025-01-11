import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'

import {Screen} from '@/Helpers'
import SVGByteCode from '@/Helpers/SVGByteCode'

export default () => {
  const {t} = useTranslation()
  return useMemo(
    () => ({
      accounting_vouchers: [
        {title: t('erp51'), svg: SVGByteCode.purchaseVoucher, path: Screen.PurchaseScreen},
        {title: t('erp34'), svg: SVGByteCode.expenseVoucher},
        {title: t('erp38'), svg: SVGByteCode.saleVoucher},
        {title: t('erp44'), svg: SVGByteCode.paymentVoucher},
        {title: t('erp45'), svg: SVGByteCode.receiptVoucher},
        {title: t('erp39'), svg: SVGByteCode.incomeVoucher},
        {title: t('erp46'), svg: SVGByteCode.journalVoucher}
      ],
      inventory_voucher: [
        {title: t('erp35'), svg: SVGByteCode.purchaseOrder},
        {title: t('erp40'), svg: SVGByteCode.salesOrder},
        {title: t('erp47'), svg: SVGByteCode.consumption},
        {title: t('erp48'), svg: SVGByteCode.stockJournal},
        {title: t('erp36'), svg: SVGByteCode.goodReceipt},
        {title: t('erp41'), svg: SVGByteCode.goodDeliveryNote},
        {title: t('erp49'), svg: SVGByteCode.orderRequirements},
        {title: t('erp50'), svg: SVGByteCode.physicalStock}
      ]
    }),

    [t]
  )
}
