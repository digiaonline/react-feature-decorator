import React from 'react'
import renderer from 'react-test-renderer'
import FeatureProvider from './FeatureProvider'

const createProvider = props => renderer.create(<FeatureProvider {...props} />)

test('Renders only children', () => {
  const tree = createProvider({
    children: <div/>
  })
 
   expect(tree.toJSON()).toMatchSnapshot()
 })

test('Renders without children', () => {
 const tree = createProvider()

  expect(tree.toJSON()).tobeNull
})

test('Recognizes defined features', () => {
  const tree = createProvider({features: ['foo']})
  const component = tree.getInstance();
 
  expect(component.isDefined('foo')).toBeTruthy
  expect(component.isDefined('bar')).toBeTruthy
})

test('Recognizes enabled features', () => {
  const tree = createProvider({features: ['foo', 'bar'], enabledFeatures: ['foo']})
  const component = tree.getInstance();
 
  expect(component.isEnabled('foo')).toBeTruthy
  expect(component.isEnabled('bar')).toBeFalsy
  expect(() => component.isEnabled('baz')).toThrow(`Feature 'baz' is not defined!`)
})