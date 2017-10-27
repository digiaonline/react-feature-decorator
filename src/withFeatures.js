// @flow

import React from 'react'
import featuresShape from './featuresShape'
import type {FeaturesContext} from './types'

type Context = {
  features: FeaturesContext,
}

export default (WrappedComponent: any) => {
  const WithFeaturesDecorator = (props: Object, {features}: Context) => (
    <WrappedComponent {...props} features={features} />
  )

  WithFeaturesDecorator.contextTypes = {
    features: featuresShape.isRequired,
  }

  WithFeaturesDecorator.WrappedComponent = WrappedComponent

  return WithFeaturesDecorator
}
