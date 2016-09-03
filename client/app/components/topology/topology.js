import angular from 'angular';
import uiRouter from 'angular-ui-router';
import cytoscape from 'cytoscape';
import ngCytoscape from 'ngCytoscape';
import topologyComponent from './topology.component';

let topologyModule = angular.module('topology', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('topology', {
      url: '/topology',
      component: 'topology',
    });
})

.component('topology', topologyComponent)

.name;

export default topologyModule;
