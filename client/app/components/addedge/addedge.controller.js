import Graph from '../../services/graph.service';
import $mdDialog from 'angular-material';

class AddEdgeController {
  constructor(Graph, $mdDialog, $scope)  {
    this._Graph = Graph;
    this._$mdDialog = $mdDialog;
    this.source = Object.keys(Graph.getSelected())[0];
    console.log(this.source);
    this.nodelist = Graph.getNodeList();
    console.log(this.nodelist);
  }
  hide() {
    this._$mdDialog.hide();
  };
  cancel() {
    this._$mdDialog.hide(false);
  };
  validate(){
    if (this.source === this.target){
      window.alert("no self loops!");
    }else{
      var retval = this._Graph.addEdge( this.source, this.target);
      if (retval !== true){
        window.alert("edge exists, not added!");
      }
    }
    this._$mdDialog.hide(true);
  }
}
AddEdgeController.$inject = [Graph, $mdDialog, '$scope', '$element', '$attrs'];
export default AddEdgeController;
