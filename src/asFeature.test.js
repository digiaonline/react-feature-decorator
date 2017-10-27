import React from 'react'
import renderer from 'react-test-renderer'
import FeatureProvider from './FeatureProvider'
import asFeature from './asFeature'

const createProvider = props => renderer.create(<FeatureProvider {...props} />)

test('Enabled features are rendered', () => {
  const EnabledFeature = asFeature('myFeature')(() => (
    <div>This is my enabled feature</div>
  ))

  const tree = createProvider({
    features: ['myFeature'],
    enabledFeatures: ['myFeature'],
    children: <EnabledFeature />,
  })

  expect(tree.toJSON()).toMatchSnapshot()
})

test('Disabled features are not rendered', () => {
  const DisabledFeature = asFeature('myFeature')(() => (
    <div>This is my disabled feature</div>
  ))

  const tree = createProvider({
    features: ['myFeature'],
    children: <DisabledFeature />,
  })

  expect(tree.toJSON()).toMatchSnapshot()
})

test('Undefined features throws an error', () => {
  const UndefinedFeature = asFeature('myFeature')(() => (
    <div>This is my undefined feature</div>
  ))

  expect(() => createProvider({children: <UndefinedFeature />})).toThrow()
})
