import TopologyModule from './topology'
import TopologyController from './topology.controller';
import TopologyComponent from './topology.component';
import TopologyTemplate from './topology.html';

describe('Topology', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TopologyModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TopologyController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(TopologyTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = TopologyComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(TopologyTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(TopologyController);
      });
  });
});
