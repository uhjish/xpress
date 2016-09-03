import angular from 'angular';
import Composition from './composition.service';
import Graph from './graph.service';

let servicesModule = angular.module('app.services', [])
.service({Composition})
.service({Graph})
.name;
export default servicesModule;
