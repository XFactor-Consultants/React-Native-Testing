import 'react-native';
import React from 'react';
import App from '../App';

import { BarCodeScanner } from 'expo-barcode-scanner';

// Note: test renderer must be required after react-native.
import {render, fireEvent} from '@testing-library/react-native';

it('renders correctly', () => {
  const rendered = render(<App />)
  rendered.getAllByText("Select File")
});
it('2 text nodes', () => {
  const rendered = render(<App />)
  expect(rendered.getAllByA11yLabel("Text")).toHaveLength(2)
});
it('buttons show', () => {
  const rendered = render(<App />)
  expect(rendered.getAllByA11yLabel("Select File")).toHaveLength(1)
  expect(rendered.getAllByA11yLabel("Start Scanner")).toHaveLength(1)
});
it('file selectable', async () => {
  const rendered = render(<App />)
  const StartScanner = rendered.getAllByA11yLabel("Start Scanner")[0]
  expect(rendered.queryAllByA11yLabel("Barcode Scanner")).toHaveLength(0)
  fireEvent.press(StartScanner)
  expect( await rendered.findAllByA11yLabel("Barcode Scanner")).toHaveLength(1)
});
it('file selectable', async () => {
  const rendered = render(<App />)
  console.log(rendered.toJSON())
});