import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'

export default () => {
  const {t} = useTranslation()
  return useMemo(
    () => [
      {
        title: t('erp33'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp38'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp54'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type', 'stax', 'ctax', 'itax']
      },
      {
        title: t('erp55'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type', 'stax', 'ctax', 'itax']
      },
      {
        title: t('erp56'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type', 'stax', 'ctax', 'itax']
      },
      {
        title: t('erp57'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type', 'stax', 'ctax', 'itax']
      },
      {
        title: t('erp58'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp59'),
        data: [
          'opening_date',
          'opening_bal',
          'opening_bal_type',
          'gstn',
          'pan',
          'contact_no',
          'address',
          'bank_name',
          'bank_ac_no',
          'ifsc'
        ]
      },
      {
        title: t('erp60'),
        data: [
          'opening_date',
          'opening_bal',
          'opening_bal_type',
          'gstn',
          'pan',
          'contact_no',
          'address',
          'bank_name',
          'bank_ac_no',
          'ifsc'
        ]
      },
      {
        title: t('erp61'),
        data: [
          'opening_date',
          'opening_bal',
          'opening_bal_type',
          'gstn',
          'pan',
          'contact_no',
          'address',
          'bank_name',
          'bank_ac_no',
          'ifsc'
        ]
      },
      {
        title: t('erp62'),
        data: [
          'opening_date',
          'opening_bal',
          'opening_bal_type',
          'gstn',
          'pan',
          'contact_no',
          'address',
          'bank_name',
          'bank_ac_no',
          'ifsc'
        ]
      },
      {
        title: t('erp63'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type', 'tax_type']
      },
      {
        title: t('erp64'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp65'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp66'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp67'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp68'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp69'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      },
      {
        title: t('erp70'),
        data: [
          'opening_date',
          'opening_bal',
          'opening_bal_type',
          'gstn',
          'pan',
          'contact_no',
          'address',
          'bank_name',
          'bank_ac_no',
          'ifsc'
        ]
      },
      {
        title: t('erp71'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type', 'stock_balances']
      },
      {
        title: t('erp72'),
        data: ['opening_date', 'opening_bal', 'opening_bal_type']
      }
    ],
    [t]
  )
}

// export default () => {
//   const { t } = useTranslation()

//   const commonData = ['opening_date', 'opening_bal', 'opening_bal_type']
//   const additionalData = ['stax', 'ctax', 'itax', 'gstn', 'pan', 'contact_no', 'address', 'bank_name', 'bank_ac_no', 'ifsc', 'tax_type', 'stock_balances']

//   const list = [
//     { title: 'erp33', data: commonData },
//     { title: 'erp38', data: commonData },
//     { title: 'erp54', data: [...commonData, ...additionalData.slice(0, 3)] },
//     { title: 'erp55', data: [...commonData, ...additionalData.slice(0, 3)] },
//     { title: 'erp56', data: [...commonData, ...additionalData.slice(0, 3)] },
//     { title: 'erp57', data: [...commonData, ...additionalData.slice(0, 3)] },
//     { title: 'erp58', data: commonData },
//     { title: 'erp59', data: [...commonData, ...additionalData] },
//     { title: 'erp60', data: [...commonData, ...additionalData] },
//     { title: 'erp61', data: [...commonData, ...additionalData] },
//     { title: 'erp62', data: [...commonData, ...additionalData] },
//     { title: 'erp63', data: [...commonData, additionalData[10]] },
//     { title: 'erp64', data: commonData },
//     { title: 'erp65', data: commonData },
//     { title: 'erp66', data: commonData },
//     { title: 'erp67', data: commonData },
//     { title: 'erp68', data: commonData },
//     { title: 'erp69', data: commonData },
//     { title: 'erp70', data: [...commonData, ...additionalData] },
//     { title: 'erp71', data: [...commonData, additionalData[11]] },
//     { title: 'erp72', data: commonData }
//   ]

//   return list.map(item => ({ title: t(item.title), data: item.data }))
// }
