import ngCytoscape from 'ngCytoscape'
import cytoscape from 'cytoscape';
import cytoData from 'cytoscape';
import jsonFormatter from 'jsonformatter';
import Composition from '../../services/composition.service';
import Graph from '../../services/graph.service';
import $mdDialog from 'angular-material';
import _ from 'lodash';
import addedgeTmpl from '../addedge/addedge.html';
import addpolicyTmpl from '../addpolicy/addpolicy.html';
import AddEdgeController from '../addedge/addedge.controller';
import AddPolicyController from '../addpolicy/addpolicy.controller';
class TopologyController {
  constructor(Composition, Graph, $mdDialog, cytoData, $scope)  {
    'ngInject';
    this.name = 'topology';
    this._Composition = Composition;
		this._Graph = Graph;
    this._$mdDialog = $mdDialog;
		this.showSelected = false;
    this.graphlayout = {name: 'grid'};
		this.graphstyle = [
			{"selector":"core","style":{"selection-box-color":"#AAD8FF","selection-box-border-color":"#8BB0D0","selection-box-opacity":"0.5"}},
			{"selector":"node:selected","style":{"border-width":"6px","border-color":"#AAD8FF","border-opacity":"0.5","background-color":"#77828C","text-outline-color":"#77828C"}},
			{ selector: 'node', style: { 'content': 'data(id)', 'text-opacity': 0.5, 'text-valign': 'center', 'text-halign': 'right', 'background-color': '#11479e' } },
			{ selector: 'edge', style: { 'width': 4, 'target-arrow-shape': 'triangle', 'line-color': '#9dbaea', 'target-arrow-color': '#9dbaea', 'curve-style': 'bezier' } },
			{ selector: 'edge:selected', style: { 'width': 4, 'target-arrow-shape': 'triangle', 'line-color': '#666666', 'target-arrow-color': '#666666', 'curve-style': 'bezier' } }
		];
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.loadGraph(7);
    let self = this;
    this._Composition.getList().then( (res) => {
      self.graphlist = res;
    })
    this.$postLink = function() {
      $scope.$on('cy:node:mouseup', function (ng, cy) {
        console.log(cy.cyTarget.data());
				self._Graph.setSelectedNode( self._Graph.getNodeById(cy.cyTarget.data().id) );
        console.log(self._Graph.getSelected());
        //self.graph.composition = JSON.stringify(cy.cyTarget.data, null, 2);
      });
      $scope.$on('cy:edge:mouseup', function (ng, cy) {
        console.log(cy.cyTarget.data());
        let edge = cy.cyTarget.data();
        let edgedata = self._Graph.getEdgeBySrcTgt( edge.source, edge.target );
				self._Graph.setSelectedEdge( edgedata );
        console.log(self._Graph.getSelected());
        //self.graph.composition = JSON.stringify(cy.cyTarget.data, null, 2);
      });
			$scope.$on('jsonview:selectNode', function(node){
				console.log("selected");
				console.log(node);
			});
			$scope.$on('jsonview:deselectNode', function(node){
				console.log("deselected");
				console.log(node);
			});
    }
		this._$scope = $scope;
  }
	aceLoaded(_editor) {
		let _session = _editor.getSession();
		let _renderer = _editor.renderer;

		_editor.on("changeSession", function(){
			console.log("session changed");
		});

		_session.on("change", function(){
			console.log("change in session");
		});
	}
  updateGraph(layout) {
    let self = this;
    self.graphelements = {};
		this.graphlayout = layout;
		let res = this._Graph.getGraph();
		self.graphelements = self.renderGraph(res);
  }

  loadGraph(idx) {
    let self = this;
		this._Graph.setGraph({});
    self.graphelements = [];
		this._Composition.get(idx).then(
      (res) => {
        //console.log(res);
        self._Graph.setGraph(res);
				self.graphelements = self.renderGraph(res);
      }
    );
  }
  addEdge(ev){
		var self = this;
    this._$mdDialog.show({
			controller: ['Graph', '$mdDialog', AddEdgeController],
			controllerAs: 'vm',
      template: addedgeTmpl,
      targetEvent: ev,
      clickOutsideToClose:true
    })
		.then(function(answer) {
			self.updateGraph({name:'dagre'});
		}, function() {
			console.log('You cancelled the dialog.');
		});
	}

  addPolicy(ev){
		var self = this;
    this._$mdDialog.show({
			controller: ['Graph', '$mdDialog', AddPolicyController],
			controllerAs: 'vm',
      template: addpolicyTmpl,
      targetEvent: ev,
      clickOutsideToClose:true
    })
		.then(function(answer) {
			console.log('successfully added policy')
		}, function() {
			console.log('You cancelled the dialog.');
		});
	}

  renderGraph( graph ) {
    var elems = {};
    if (!graph.hasOwnProperty("components")){
      return [];
    }
    for (var node of graph.components){
      elems[node.id] = {
        "data": {
          "id":node.id,
          "name":node.name,
          "query":true,
        },
        "group":"nodes",
        "removed":false,"selected":false,"selectable":true,
        "locked":false,"grabbed":false,"grabbable":true,
        "classes":node.type
      };
    }
    var edges = [];
    if (!graph.hasOwnProperty("topology")){
      return Object.values(elems);
    }
    if (!graph.topology.hasOwnProperty("nodes")){
      return Object.values(elems);
    }
		var idx = 0;
    for (var node of graph.topology.nodes) {
      for (var k in Object.keys(node)){
        if (k !== "connections") {
          elems[node.component_id].data[k] = node[k];
        }
      }
      if (node.hasOwnProperty("connections")){
        for (var e in node.connections){
          let v = node.connections[e];
					idx = idx + 1;
					let src_id = node.component_id;
					let tgt_id = v.component_id;
					let e_id = src_id + "|" + tgt_id;
          edges[e_id] = {
            "data":{
							"id": e_id,
              "source":src_id,
              "target":tgt_id,
            },
            "group":"edges","selectable":true

          };
        }
      }
    }
		for (var attrname in edges) {
			 elems[attrname] = edges[attrname];
		}
    console.log(elems);
    return elems;
  }
}
TopologyController.$inject = ['Composition', 'Graph','$mdDialog', 'cytoData', '$scope'];
export default TopologyController;
