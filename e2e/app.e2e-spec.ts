import { NgCusinePage } from './app.po';

describe('ng-cusine App', () => {
  let page: NgCusinePage;

  beforeEach(() => {
    page = new NgCusinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
