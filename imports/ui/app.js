import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
  Books
} from '../api/books';

class App {
  constructor($scope) {
    $scope.viewModel(this);

    // limit state
    this.limit = 5;

    // loading status
    this.loading = true;

    // sub
    this.subscribe('books', () => {
      // params
      this.start();

      return [
        this.getReactively('limit')
      ];
    }, () => {
      // onReady
      this.stop();
    });

    this.helpers({
      books() {
        const limit = this.getReactively('limit');

        return Books.find({}, {
          limit
        });
      }
    });
  }

  toggle() {
    this.limit = this.limit === 5 ? 10 : 5;
  }

  start() {
    console.log('STARTS loading');
    this.loading = true;
  }

  stop() {
    console.log('STOPS loading');
    this.loading = false;
  }
}
App.$inject = ['$scope'];

const name = 'app';

export default angular.module(name, [
  angularMeteor
]).component(name, {
  controllerAs: name,
  controller: App,
  template: `
    <button ng-click="app.toggle()">Toggle</button>

    <ul>
      <li ng-repeat="book in app.books">
        {{ book | json }}
      </li>
    </ul>
  `
});
