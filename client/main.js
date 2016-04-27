import angular from 'angular';

import App from '../imports/ui/app';

angular.element(document).ready(() => {
  angular.bootstrap(document, [
    App.name
  ], {
    strictDi: true
  });
});
