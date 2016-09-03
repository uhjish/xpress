import angular from 'angular';
import AuthConfig from './auth.config';
import AuthCtrl from './auth.controller';

// Create the home module where our functionality can attach to
let authModule = angular.module('app.auth', [])
.config(AuthConfig)
.controller('AuthCtrl', AuthCtrl)
.name;

export default authModule;
