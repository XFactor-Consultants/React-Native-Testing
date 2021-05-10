import 'react-native';
import React from 'react';
import {BarCodeSection, mimetype} from '../App';

// Note: test renderer must be required after react-native.
import {render, fireEvent} from '@testing-library/react-native';

it('renders correctly', () => {
  const rendered = render(<BarCodeSection />)
});

it('handles null value', () => {
    const rendered = render(<BarCodeSection />)
    expect(rendered.toJSON()).toBeNull()
});

it('handles non-null value', () => {
    const rendered = render(<BarCodeSection readyScan={true}/>)
    expect(rendered.toJSON()).toBeTruthy()
});

it('handles scanned png', () => {
    const mock = jest.fn()
    const rendered = render(<BarCodeSection readyScan={true} scanned={mock} mockScan="https://pluralsight.com/"/>)
    expect(mock).toBeCalledWith("https://pluralsight.com/")
});