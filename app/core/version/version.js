'use strict';

angular.module('userMang.version', [
  'userMang.version.interpolate-filter',
  'userMang.version.version-directive'
])

.value('version', '0.1');
