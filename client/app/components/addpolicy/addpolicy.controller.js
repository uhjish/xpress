import Graph from '../../services/graph.service';
import $mdDialog from 'angular-material';

class AddPolicyController {
  constructor(Graph, $mdDialog, $scope)  {
    this._Graph = Graph;
    this._$mdDialog = $mdDialog;
    this.address = Object.keys(Graph.getSelected())[0];
    this.type = Graph.getSelectedType();
    if (this.type === "graph"){
      window.alert("Please select a node or edge first!");
    }
    let pol = this._Graph.getPolicy(this.type, this.address);
    this.policy = JSON.stringify(pol);
  }
  hide() {
    this._$mdDialog.hide(false);
  };
  cancel() {
    this._$mdDialog.hide(false);
  };
  validate(){
    try {
      let parsed = JSON.parse(this.policy);
      this._Graph.setPolicy(this.type, this.address, parsed);
      this._$mdDialog.hide(true);
    } catch (err) {
      console.log(err)
      window.alert("policy must be a valid json object!");
    }
  }
}

AddPolicyController.$inject = [Graph, $mdDialog, '$scope', '$element', '$attrs'];
export default AddPolicyController;
