'use strict';

describe('userMang.version module', function() {
  beforeEach(module('userMang.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
