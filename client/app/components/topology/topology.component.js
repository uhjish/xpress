import template from './topology.html';
import controller from './topology.controller';
import './topology.styl';
let topologyComponent = {
  restrict: 'E',
  bindToController: {
    glayout: '=',
    gelements: '=',
    gstyle: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default topologyComponent;
