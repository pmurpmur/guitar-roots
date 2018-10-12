import { newE2EPage } from '@stencil/core/testing';

describe('home', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<home></home>');

    const element = await page.find('home');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<home></home>');

    const element = await page.find('home ion-content ion-button');
    expect(element.textContent).toEqual('Profile page');
  });
});
