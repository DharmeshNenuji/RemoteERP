import {useMemo} from 'react'
import type {RegisterOptions} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import type {TextInputProps} from 'react-native'

const BalanceTypeData = [
  {
    title: 'Credit',
    value: 'cr'
  },
  {
    title: 'Debit',
    value: 'dr'
  }
]

const TaxTypeData = [
  {
    title: 'State Tax',
    value: 'cr'
  },
  {
    title: 'Central Tax',
    value: 'dr'
  },
  {
    title: 'Integrated Tax',
    value: 'dr'
  },
  {
    title: 'TDS Payable',
    value: 'dr'
  },
  {
    title: 'TDS Receivable',
    value: 'dr'
  },
  {
    title: 'TCS Payable',
    value: 'dr'
  },
  {
    title: 'TCS Receivable',
    value: 'dr'
  },
  {
    title: 'Other Deductions',
    value: 'dr'
  }
]

export type BalanceType = typeof BalanceTypeData

export default () => {
  const {t} = useTranslation()

  return useMemo(() => {
    const Validations: Record<
      string,
      TextInputProps & {
        label: string
        rules: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
        options?: typeof BalanceTypeData
      }
    > = {
      name: {
        label: t('erp99'),
        rules: {
          required: t('erp101')
        },
        returnKeyType: 'next'
      },
      description: {
        label: t('erp100'),
        rules: {
          required: t('erp102')
        },
        returnKeyType: 'done'
      },
      opening_date: {
        label: t('erp86'),
        rules: {
          required: t('erp73')
        },
        returnKeyType: 'next'
      },
      opening_bal: {
        label: t('erp87'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp74'),
          min: 0,
          pattern: {
            value: /^[0-9]*$/,
            message: 'Please enter a valid balance'
          }
        },
        returnKeyType: 'next'
      },
      opening_bal_type: {
        label: t('erp88'),
        rules: {
          required: t('erp75')
        },
        options: BalanceTypeData,
        returnKeyType: 'next'
      },
      tax_type: {
        label: t('erp106'),
        rules: {
          required: t('erp75')
        },
        options: TaxTypeData,
        returnKeyType: 'next'
      },
      gstn: {
        label: t('erp89'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp76'),
          pattern: {
            value: /^[0-9]*$/,
            message: 'Please enter a valid balance'
          }
        },
        returnKeyType: 'next'
      },
      stax: {
        label: t('erp90'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp77'),
          pattern: {
            value: /^[0-9]*$/,
            message: 'Please enter a valid balance'
          }
        },
        returnKeyType: 'next'
      },
      ctax: {
        label: t('erp91'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp78'),
          pattern: {
            value: /^[0-9]*$/,
            message: 'Please enter a valid balance'
          }
        }
      },
      itax: {
        label: t('erp92'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp79'),
          pattern: {
            value: /^[0-9]*$/,
            message: 'Please enter a valid balance'
          }
        }
      },
      pan: {
        label: t('erp93'),
        keyboardType: 'default',
        autoCapitalize: 'characters',
        rules: {
          required: t('erp80')
        },
        returnKeyType: 'next'
      },
      contact_no: {
        label: t('erp94'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp81'),
          pattern: {
            value: /^[0-9]*$/,
            message: 'Please enter a valid balance'
          }
        },
        returnKeyType: 'next'
      },
      address: {
        label: t('erp95'),
        keyboardType: 'default',
        rules: {
          required: t('erp82')
        },
        returnKeyType: 'next'
      },
      bank_name: {
        label: t('erp96'),
        keyboardType: 'default',
        rules: {
          required: t('erp83')
        }
      },
      bank_ac_no: {
        label: t('erp97'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp84'),
          pattern: {
            value: /^[0-9]*$/,
            message: 'Please enter a valid Bank number'
          }
        },
        returnKeyType: 'next'
      },
      ifsc: {
        label: t('erp98'),
        keyboardType: 'default',
        rules: {
          required: t('erp85')
        },
        returnKeyType: 'next'
      },
      stock_balances: {
        label: t('erp107'),
        rules: {}
      }
    }
    return Validations
  }, [t])
}
