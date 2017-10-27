// @flow

import {Component, Children} from 'react'
import featuresShape from './featuresShape'
import type {FeatureName} from './types'

type Props = {
  features: Array<FeatureName>,
  enabledFeatures: Array<FeatureName>,
  children: any,
}

class FeatureProvider extends Component<Props, void> {
  static defaultProps = {
    features: [],
    enabledFeatures: [],
  }

  static childContextTypes = {
    features: featuresShape.isRequired,
  }

  getChildContext() {
    return {
      features: {
        isDefined: this.isDefined,
        isEnabled: this.isEnabled,
        tryIsDefined: this.tryIsDefined,
      },
    }
  }

  isDefined = (featureName: FeatureName) => {
    return this.props.features.indexOf(featureName) !== -1
  }

  tryIsDefined = (featureName: FeatureName) => {
    if (!this.isDefined(featureName)) {
      throw `Feature '${featureName}' is not defined!`
    }
  }

  isEnabled = (featureName: FeatureName) => {
    this.tryIsDefined(featureName)

    return this.props.enabledFeatures.indexOf(featureName) !== -1
  }

  render() {
    return this.props.children ? Children.only(this.props.children) : null
  }
}

export default FeatureProvider
