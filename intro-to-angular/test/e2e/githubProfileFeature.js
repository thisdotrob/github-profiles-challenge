describe('Github profile finder', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Github user search');
  });

  it('display the search label', function() {
    element(by.model('searchCtrl.searchTerm')).sendKeys('thisdotrob');
    element(by.css('.btn')).click();
    expect(element(by.binding('searchCtrl.searchTerm')).getText()).toEqual('thisdotrob');
  });

  it('displays the username in the search result', function() {
    element(by.model('searchCtrl.searchTerm')).sendKeys('thisdotrob');
    element(by.css('.btn')).click();
    expect(element(by.binding('user.login')).getText()).toEqual('thisdotrob');
  });

  it('displays the username in the search result', function() {
    element(by.model('searchCtrl.searchTerm')).sendKeys('thisdotrob');
    element(by.css('.btn')).click();
    var results = element.all(
      by.repeater('user in searchCtrl.searchResult.items')
    );
    var username = results.first().element(by.binding('user.login'));
    expect(username.getText()).toEqual('thisdotrob');
  });

  it('displays the user\'s profile picture in the search results', function() {
    element(by.model('searchCtrl.searchTerm')).sendKeys('thisdotrob');
    element(by.css('.btn')).click();
    var results = element.all(
      by.repeater('user in searchCtrl.searchResult.items')
    );
    var img = results.first().element(by.id('profilepicture'));
    var src = 'https://avatars.githubusercontent.com/u/12902589?v=3&s=150';
    expect(img.isPresent()).toBe(true);
    expect(img.getAttribute('src')).toEqual(src);
  });

  it('displays multiple search results', function() {
    element(by.model('searchCtrl.searchTerm')).sendKeys('thisdot');
    element(by.css('.btn')).click();
    var results = element.all(
      by.repeater('user in searchCtrl.searchResult.items')
    );
    expect(results.count()).toEqual(8);
  });

});
