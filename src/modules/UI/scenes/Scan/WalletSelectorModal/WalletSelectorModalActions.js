// @flow

export const PREFIX = 'WALLET_SELECTOR_MODAL/'

export const ACTIVATED = PREFIX + 'ACTIVATED'
export const activated = () => ({
  type: ACTIVATED
})

export const DEACTIVATED = PREFIX + 'DEACTIVATED'
export const deactivated = () => ({
  type: DEACTIVATED
})

export const TOGGLED = PREFIX + 'TOGGLED'
export const toggled = () => ({
  type: TOGGLED
})
