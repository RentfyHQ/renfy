'use strict';

describe('Directive: gmap', function () {

  // load the directive's module
  beforeEach(module('rentbongoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gmap></gmap>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gmap directive');
  }));
});