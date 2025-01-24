import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'

import {COMMON_FIELD_2, COMMON_FIELD_3} from './AccountStaticFields'

export default () => {
  const {t} = useTranslation()

  const FIELDS = useMemo(
    () => ({
      purchase: {
        title: t('erp33'),
        value: 'Purchase'
      },
      sales: {
        title: t('erp154'),
        value: 'Sales'
      },
      direct_expenses: {
        title: t('erp54'),
        data: COMMON_FIELD_3,
        value: 'Direct Expenses'
      },
      indirect_expenses: {
        title: t('erp55'),
        data: COMMON_FIELD_3,
        value: 'Indirect Expenses'
      },
      direct_income: {
        title: t('erp56'),
        data: COMMON_FIELD_3,
        value: 'Direct Income'
      },
      indirect_income: {
        title: t('erp57'),
        data: COMMON_FIELD_3,
        value: 'Indirect Income'
      },
      capital: {
        title: t('erp58'),
        value: 'Capital'
      },
      loan_taken: {
        title: t('erp59'),
        data: COMMON_FIELD_2,
        value: 'Loan Taken'
      },
      loan_given: {
        title: t('erp60'),
        data: COMMON_FIELD_2,
        value: 'Loan Given'
      },
      sundry_creditors: {
        title: t('erp61'),
        data: COMMON_FIELD_2,
        value: 'Sundry Creditors'
      },
      sundry_debtors: {
        title: t('erp62'),
        data: COMMON_FIELD_2,
        value: 'Sundry Debtors'
      },
      duties_and_taxes: {
        title: t('erp63'),
        data: ['tax_type'],
        value: 'Duties and Taxes'
      },
      reserves_and_surplus: {
        title: t('erp64'),
        value: 'Reserves & Surplus'
      },
      fixed_assets: {
        title: t('erp65'),
        value: 'Fixed Assets'
      },
      provisions: {
        title: t('erp66'),
        value: 'Provisions'
      },
      fixed_deposits_or_investments: {
        title: t('erp67'),
        value: 'Fixed Deposits or Investments'
      },
      deposits: {
        title: t('erp68'),
        value: 'Deposits'
      },
      cash: {
        title: t('erp69'),
        value: 'Cash'
      },
      bank: {
        title: t('erp70'),
        data: COMMON_FIELD_2,
        value: 'Bank'
      },
      stock_in_hand: {
        title: t('erp71'),
        data: ['stock_balances'],
        value: 'Stock In Hand'
      },
      suspense: {
        title: t('erp72'),
        value: 'Suspense'
      }
    }),
    [t]
  )

  return useMemo(() => FIELDS, [FIELDS])
}
