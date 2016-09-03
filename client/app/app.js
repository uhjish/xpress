import jquery from 'jquery';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import cytoscape from 'cytoscape';
import ngCytoscape from 'ngCytoscape';
import jsonFormatter from 'jsonformatter';
import angularMaterial from 'angular-material';
import Common from './common/common';
import Components from './components/components';
import Auth from './auth/auth'
import Services from './services/services'
import AppComponent from './app.component';
import constants  from './config/app.constants';
import jsonview from 'ux-jsonview';
import jsonedit from 'jsonedit';
import uiace from 'angular-ui-ace';
import edgehandles from 'cytoscape-edgehandles';
import 'angular-ui-sortable';
import 'normalize.css';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

edgehandles( cytoscape, jquery );

angular.module('app', [
    uiRouter,
    angularMaterial,
    Common,
    Components,
		Services,
    ngCytoscape,
    jsonFormatter,
    jsonview,
    jsonedit,
  ])
  .config(($locationProvider, $mdThemingProvider, JSONFormatterConfigProvider,
					 $httpProvider, $stateProvider, $urlRouterProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
		//$httpProvider.interceptors.push(authInterceptor);
    $locationProvider.html5Mode(true).hashPrefix('!');
    $mdThemingProvider.theme('default');
    JSONFormatterConfigProvider.hoverPreviewEnabled = false;
  })
	.constant('AppConstants', constants)
  .component('app', AppComponent);
