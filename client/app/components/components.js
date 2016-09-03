import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Topology from './topology/topology';
import AddEdge from './addedge/addedge';
import AddPolicy from './addpolicy/addpolicy';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Topology
])

.name;

export default componentModule;
