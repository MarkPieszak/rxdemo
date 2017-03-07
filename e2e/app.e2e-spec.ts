import { RxdemoPage } from './app.po';

describe('rxdemo App', () => {
  let page: RxdemoPage;

  beforeEach(() => {
    page = new RxdemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
