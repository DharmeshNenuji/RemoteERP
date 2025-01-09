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
        }
      },
      description: {
        label: t('erp100'),
        rules: {
          required: t('erp102')
        }
      },
      opening_date: {
        label: t('erp86'),
        rules: {
          required: t('erp73')
        }
      },
      opening_bal: {
        label: t('erp87'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp74'),
          min: 0,
          pattern: {
            value: /^[0-9]*$/, // Regex for numbers only
            message: 'Please enter a valid balance'
          }
        }
      },
      opening_bal_type: {
        label: t('erp88'),
        rules: {
          required: t('erp75')
        },
        options: BalanceTypeData
      },
      gstn: {
        label: t('erp89'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp76'),
          pattern: {
            value: /^[0-9]*$/, // Regex for numbers only
            message: 'Please enter a valid balance'
          }
        }
      },
      stax: {
        label: t('erp90'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp77'),
          pattern: {
            value: /^[0-9]*$/, // Regex for numbers only
            message: 'Please enter a valid balance'
          }
        }
      },
      ctax: {
        label: t('erp91'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp78'),
          pattern: {
            value: /^[0-9]*$/, // Regex for numbers only
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
            value: /^[0-9]*$/, // Regex for numbers only
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
        }
      },
      contact_no: {
        label: t('erp94'),
        keyboardType: 'decimal-pad',
        rules: {
          required: t('erp81'),
          pattern: {
            value: /^[0-9]*$/, // Regex for numbers only
            message: 'Please enter a valid balance'
          }
        }
      },
      address: {
        label: t('erp95'),
        keyboardType: 'default',
        rules: {
          required: t('erp82')
        }
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
            value: /^[0-9]*$/, // Regex for numbers only
            message: 'Please enter a valid Bank number'
          }
        }
      },
      ifsc: {
        label: t('erp98'),
        keyboardType: 'default',
        rules: {
          required: t('erp85')
        }
      }
    }
    return Validations
  }, [t])
}
