import { ref } from '@vue/composition-api'
import { walletStore } from '~/store'
import { settingsStore } from '~/store'

export default function useValidation () {
    // is form valid
    const valid = ref(true)

    // generic validation
    const required = (v: string) => !!v || 'Value is required'
    const validAmt = (v: string) => /[0-9]+(\.[0-9][0-9])?$/.test(v) && !isNaN(+v) && +v > 0 || 'Invalid Amount'
    const sufficientAmount = (v: string) => +v < walletStore.balance * settingsStore.multiplier || 'Insufficient Balance'
    const char1024 = (v: string) => v.length <= 1024 || 'Too Long'

    return {
        required,
        valid,
        validAmt,
        sufficientAmount,
        char1024
    }
}