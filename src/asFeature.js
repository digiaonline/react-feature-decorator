// @flow

import React, {Component} from 'react'
import withFeatures from './withFeatures'

export default (featureName: string) => (WrappedComponent: any) => {
  class AsFeatureDecorator extends Component<*, *> {
    props: Object

    static WrappedComponent: any

    componentWillMount() {
      this.props.features.tryIsDefined(featureName)
    }

    render() {
      return this.props.features.isEnabled(featureName) ? (
        <WrappedComponent {...this.props} />
      ) : null
    }
  }

  AsFeatureDecorator.WrappedComponent = WrappedComponent

  return withFeatures(AsFeatureDecorator)
}
