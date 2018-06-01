// @flow

import React, { Component } from 'react'
import { Image, TouchableHighlight, View, TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MDIcon from 'react-native-vector-icons/MaterialIcons'
import { ARROW_FORWARD } from '../../../../constants/IconConstants.js'
import Ionicon from 'react-native-vector-icons/Ionicons'
import person from '../../../../assets/images/sidenav/accounts.png'
import { emptyGuiDenomination } from '../../../../types'
import type { GuiDenomination } from '../../../../types'
import { getDenomFromIsoCode } from '../../../utils.js'
import T from '../../components/FormattedText'
import ExchangeRate from '../ExchangeRate/index.js'
import Gradient from '../Gradient/Gradient.ui'
import SafeAreaView from '../SafeAreaView/SafeAreaViewDrawer.ui.js'
import Main from './Component/MainConnector'
import styles from './style'

export type Props = {
  currencyLogo: string,
  primaryDisplayCurrencyCode: string,
  primaryDisplayDenomination: GuiDenomination,
  primaryExchangeDenomination: GuiDenomination,
  secondaryDisplayCurrencyCode: string,
  secondaryToPrimaryRatio: number,
  styles: Object,
  username: string,
  openSelectUser: () => void,
  closeSelectUser: () => void
}

export default class ControlPanel extends Component<Props> {
  _handlePressUserList = () => {
    if (!this.props.usersView) {
      return this.props.openSelectUser()
    }
    if (this.props.usersView) {
      return this.props.closeSelectUser()
    }
  }

  render () {
    const {
      currencyLogo,
      primaryDisplayCurrencyCode,
      primaryDisplayDenomination,
      primaryExchangeDenomination,
      secondaryDisplayCurrencyCode,
      secondaryToPrimaryRatio
    } = this.props

    const secondaryExchangeDenomination = secondaryDisplayCurrencyCode ? getDenomFromIsoCode(secondaryDisplayCurrencyCode) : ''

    const primaryCurrencyInfo = {
      displayCurrencyCode: primaryDisplayCurrencyCode,
      displayDenomination: primaryDisplayDenomination || emptyGuiDenomination,
      exchangeDenomination: primaryExchangeDenomination || emptyGuiDenomination,
      exchangeCurrencyCode: primaryDisplayCurrencyCode
    }
    const secondaryCurrencyInfo = {
      displayCurrencyCode: secondaryDisplayCurrencyCode,
      displayDenomination: secondaryExchangeDenomination || emptyGuiDenomination,
      exchangeDenomination: secondaryExchangeDenomination || emptyGuiDenomination,
      exchangeCurrencyCode: secondaryDisplayCurrencyCode
    }

    const arrowIcon = this.props.usersView ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
    const sliderIconPrefix = global.OS === 'ios' ? 'ios' : 'md'
    const sliderArrowIcon = sliderIconPrefix + '-' + ARROW_FORWARD

    return (
      <SafeAreaView>
        <Gradient reverse style={styles.container}>
          <View style={styles.backArrowContainer}>
            <TouchableWithoutFeedback >
              <Ionicon name={sliderArrowIcon} size={38} color='white' onPress={Actions.drawerClose}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.bitcoin.container}>
            {this.renderCryptoIcon(currencyLogo)}
            <ExchangeRate
              primaryInfo={primaryCurrencyInfo}
              secondaryInfo={secondaryCurrencyInfo}
              secondaryDisplayAmount={secondaryToPrimaryRatio}
            />
          </View>
          <TouchableHighlight onPress={this._handlePressUserList} underlayColor={styles.underlay.color}>
            <View style={styles.user.container}>
              <View style={styles.iconImageContainer}>
                <Image style={styles.iconImage} source={person} />
              </View>
              <T style={styles.user.name}>{this.props.username}</T>
              <MDIcon style={styles.icon} name={arrowIcon} />
            </View>
          </TouchableHighlight>
          <Main />
        </Gradient>
      </SafeAreaView>
    )
  }

  renderCryptoIcon = (currencyLogo: string) => {
    if (currencyLogo) {
      return <Image style={styles.bitcoin.icon} source={{ uri: currencyLogo }} />
    }
    return <Image style={styles.bitcoin.icon} />
  }
}
