import angular from 'angular';
import uiRouter from 'angular-ui-router';

let selectedinfoModule = angular.module('selectedinfo', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('selectedinfo', {
      url: '/selectedinfo',
      component: 'selectedinfo',
    });
})

.component('selectedinfo', selectedinfoComponent)

.name;

export default selectedinfoModule;
