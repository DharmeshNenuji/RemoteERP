import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'

import {COMMON_FIELD_2, COMMON_FIELD_3} from './AccountStaticFields'

export default () => {
  const {t} = useTranslation()

  const FIELDS = useMemo(
    () => ({
      purchase: {
        title: t('erp33'),
        data: []
      },
      sales: {
        title: t('erp38'),
        data: []
      },
      direct_expenses: {
        title: t('erp54'),
        data: COMMON_FIELD_3
      },
      indirect_expenses: {
        title: t('erp55'),
        data: COMMON_FIELD_3
      },
      direct_income: {
        title: t('erp56'),
        data: COMMON_FIELD_3
      },
      indirect_income: {
        title: t('erp57'),
        data: COMMON_FIELD_3
      },
      capital: {
        title: t('erp58'),
        data: []
      },
      loan_taken: {
        title: t('erp59'),
        data: COMMON_FIELD_2
      },
      loan_given: {
        title: t('erp60'),
        data: COMMON_FIELD_2
      },
      sundry_creditors: {
        title: t('erp61'),
        data: COMMON_FIELD_2
      },
      sundry_debtors: {
        title: t('erp62'),
        data: COMMON_FIELD_2
      },
      duties_and_taxes: {
        title: t('erp63'),
        data: ['tax_type']
      },
      reserves_and_surplus: {
        title: t('erp64'),
        data: []
      },
      fixed_assets: {
        title: t('erp65'),
        data: []
      },
      provisions: {
        title: t('erp66'),
        data: []
      },
      fixed_deposits_or_investments: {
        title: t('erp67'),
        data: []
      },
      deposits: {
        title: t('erp68'),
        data: []
      },
      cash: {
        title: t('erp69'),
        data: []
      },
      bank: {
        title: t('erp70'),
        data: COMMON_FIELD_2
      },
      stock_in_hand: {
        title: t('erp71'),
        data: ['stock_balances']
      },
      suspense: {
        title: t('erp72'),
        data: []
      }
    }),
    [t]
  )

  return useMemo(() => FIELDS, [FIELDS])
}
