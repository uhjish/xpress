import template from './addedge.html';
import controller from './addedge.controller';
import './addedge.styl';
let addedgeComponent = {
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

export default addedgeComponent;
