import angular from 'angular';
import uiRouter from 'angular-ui-router';
import addpolicyComponent from './addpolicy.component';

let addpolicyModule = angular.module('addpolicy', [
  uiRouter
])

.component('addpolicy', addpolicyComponent)

.name;

export default addpolicyModule;
