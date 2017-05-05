import { CousinePage } from './app.po';

describe('cousine App', () => {
  let page: CousinePage;

  beforeEach(() => {
    page = new CousinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
