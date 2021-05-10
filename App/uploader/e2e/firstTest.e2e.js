// const {reloadApp} = require('detox-expo-helpers')
describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should run', async () => {
    
  });
  
// it('renders correctly', () => {
//   rendered.getAllByText("Select File")
// });
  it('2 text nodes', async () => {
    // expect(rendered.getAllByA11yRole("Text")).toHaveLength(2)
    await expect( element(by.label('Text')).atIndex(0) ).toBeVisible()
    await expect( element(by.label('Text')).atIndex(1) ).toBeVisible()
  });
  it('buttons show', async () => {
    await expect( element(by.label('Select File')) ).toBeVisible()
    await expect( element(by.label('Start Scanner')) ).toBeVisible()
  });
  it('scanner opens', async () => {
    // const StartScanner = rendered.getAllByA11yLabel("Start Scanner")[0]
    
    // expect(rendered.queryAllByA11yLabel("Barcode Scanner")).toHaveLength(0)
    await expect( element(by.label('Barcode Scanner')) ).toBeNotVisible()
    await element(by.label('Start Scanner')).tap()
    await expect( element(by.label('Barcode Scanner')) ).toBeVisible()
  });
  it('scanner opens and closes', async () => {
    await expect( element(by.label('Barcode Scanner')) ).toBeNotVisible()
    await element(by.label('Start Scanner')).tap()
    await expect( element(by.label('Barcode Scanner')) ).toBeVisible()
    await element(by.text('Close')).tap()
    await expect( element(by.label('Barcode Scanner')) ).toBeNotVisible()
  });

});
