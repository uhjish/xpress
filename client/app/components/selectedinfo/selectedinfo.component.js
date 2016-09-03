import template from './selectedinfo.html';
import controller from './selectedinfo.controller';
import './selectedinfo.styl';

let selectedinfoComponent = {
  restrict: 'E',
  bindToController: {
    subcomponent: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default selectedinfoComponent;
