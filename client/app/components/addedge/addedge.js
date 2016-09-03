import angular from 'angular';
import addedgeComponent from './addedge.component';

let addedgeModule = angular.module('about', [
])
.component('about', addedgeComponent)
.name;

export default addedgeModule;
