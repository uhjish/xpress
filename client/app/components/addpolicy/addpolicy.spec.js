import AddpolicyModule from './addpolicy'
import AddpolicyController from './addpolicy.controller';
import AddpolicyComponent from './addpolicy.component';
import AddpolicyTemplate from './addpolicy.html';

describe('Addpolicy', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AddpolicyModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AddpolicyController();
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
      expect(AddpolicyTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AddpolicyComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AddpolicyTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AddpolicyController);
      });
  });
});
