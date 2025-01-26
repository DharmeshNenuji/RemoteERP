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
    value: 'State Tax'
  },
  {
    title: 'Central Tax',
    value: 'Central Tax'
  },
  {
    title: 'Integrated Tax',
    value: 'Integrated Tax',
    isTextRate: false
  },
  {
    title: 'TDS Payable',
    value: 'TDS Payable',
    isTextRate: true
  },
  {
    title: 'TDS Receivable',
    value: 'TDS Receivable',
    isTextRate: true
  },
  {
    title: 'TCS Payable',
    value: 'TCS Payable',
    isTextRate: true
  },
  {
    title: 'TCS Receivable',
    value: 'TCS Receivable',
    isTextRate: true
  },
  {
    title: 'Other Deductions',
    value: 'Other Deductions',
    isTextRate: true
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
        options?: typeof TaxTypeData
      }
    > = {
      acc_grp: {
        label: t('erp103'),
        rules: {
          required: t('erp171')
        }
      },
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
          min: 0
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
      tds: {
        label: t('erp174'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp175')
        }
      },
      gstn: {
        label: t('erp89'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp76')
        },
        returnKeyType: 'next'
      },
      stax: {
        label: t('erp90'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp77')
        },
        returnKeyType: 'next'
      },
      ctax: {
        label: t('erp91'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp78')
        }
      },
      itax: {
        label: t('erp92'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp79')
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
          required: t('erp81')
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
          required: t('erp84')
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
