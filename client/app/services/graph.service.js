import _ from 'lodash';

export default class Graph {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

    // Object to store our user properties
    this.graph = {};
    this.graph.selected = {type: "graph", data:{}, options: { "mode": "code" }};
  }

  setGraph(res){
    console.log(res);
    this.graph.composition = res;
  }

  getGraph(){
    return this.graph.composition;
  }

  getSelected(){
    return this.graph.selected.data;
  }

  setSelectedNode( dat ){
    this.graph.selected.data = dat;
    this.graph.selected.type = 'node';
  }

  setSelectedEdge( dat ){
    this.graph.selected.data = dat;
    this.graph.selected.type = 'edge';
  }

  getSelectedId(){
    return Object.keys(this.graph.selected.data)[0];
  }

  getSelectedType( ){
    return this.graph.selected.type;
  }

  getNodeList() {
    return _.map(this.graph.composition.components, 'id');
  }

  getNodeById(id) {
    let self = this;
    console.log(id);
    let retval = {
			component: _.find(self.graph.composition.components, (x) => x.id === id),
			node: _.find(self.graph.composition.topology.nodes, (x) => x.component_id === id)
    };
		var ret = {};
		ret[id] = retval;
		return ret;

  }

  addEdge( src, tgt ) {
    let self = this;
    if (src === tgt) {
      return false;
    }
		let srcIdx = _.findIndex(self.graph.composition.topology.nodes, (x) => x.component_id === src);
		let node = self.graph.composition.topology.nodes[srcIdx];
		let tgtIdx =  _.findIndex( node.connections, (x) => x.component_id === tgt);
    console.log(self.graph.composition);
    if (tgtIdx === -1){
      var conns = self.graph.composition.topology.nodes[srcIdx].connections;
      if (!conns) {
        conns = [];
      }
      console.log(conns);
      var edge = {};
      edge["component_id"] = tgt;
      conns.push(edge);
      self.graph.composition.topology.nodes[srcIdx].connections = conns;
      console.log(conns);
    }else{
      return false;
    }
    console.log(self.graph.composition);
    return true;
  }

  setPolicy( type, addr, policy ) {
    let self = this;
    if (type === "node"){
      let srcIdx = _.findIndex(self.graph.composition.topology.nodes, (x) => x.component_id === addr);
      self.graph.composition.topology.nodes[srcIdx].policy = policy;
    }else{
      let spls = addr.split('|');
      let src = spls[0];
      let tgt = spls[1];
      let srcIdx = _.findIndex(self.graph.composition.topology.nodes, (x) => x.component_id === src);
      let node = self.graph.composition.topology.nodes[srcIdx];
      let tgtIdx =  _.findIndex( node.connections, (x) => x.component_id === tgt);
      self.graph.composition.topology.nodes[srcIdx].connections[tgtIdx].policy = policy;
    }
  }

  getPolicy( type, addr ) {
    let self = this;
    var pol;
    if (type === "node"){
      let srcIdx = _.findIndex(self.graph.composition.topology.nodes, (x) => x.component_id === addr);
      pol = self.graph.composition.topology.nodes[srcIdx].policy;
    }else{
      let spls = addr.split('|');
      let src = spls[0];
      let tgt = spls[1];
      let srcIdx = _.findIndex(self.graph.composition.topology.nodes, (x) => x.component_id === src);
      let node = self.graph.composition.topology.nodes[srcIdx];
      let tgtIdx =  _.findIndex( node.connections, (x) => x.component_id === tgt);
      pol = self.graph.composition.topology.nodes[srcIdx].connections[tgtIdx].policy;
    }
    if (!pol) {
      pol = {};
    }
    return pol;

  }

	save(){
		for (var k in this.graph.selected.data) {
			if (this.graph.selected.type === "node") {
				this.saveNodeById(k, this.graph.selected.data[k]);
			} else {
				let src, tgt = k.split("|");
				this.saveEdgeBySrcTgt(src, tgt, this.graph.selected.data[k]);
			}
		}
	}

	saveNodeById(id, val) {
		let compIdx = _.findIndex(self.graph.composition.components, (x) => x.id === id);
		let nodeIdx = _.findIndex(self.graph.composition.topology.nodes, (x) => x.component_id === id);
		self.graph.composition.components[compIdx] = val["component"];
		self.graph.composition.topology.nodes[nodeIdx] = val["node"];
	}

	saveEdgeBySrcTgt(src, tgt, val) {
		let srcIdx = _.findIndex(self.graph.composition.topology.nodes, (x) => x.component_id === src);
		let node = self.graph.composition.topology.nodes[srcIdx];
		let tgtIdx =  _.findIndex( node.connections, (x) => x.component_id === tgt);
		self.graph.composition.topology.nodes[srcIdx].connections[tgtIdx] = val;
	}

  getEdgeBySrcTgt(src, tgt){
    let self = this;
    let node = _.find(self.graph.composition.topology.nodes, (x) => x.component_id === src);
    let retval =  {
			connection: _.find( node.connections, (x) => x.component_id = tgt)
    };
		var ret = {};
		ret[src + "|" + tgt] = retval;
		return ret;
  }



}
