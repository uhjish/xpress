import _ from 'lodash';

export default class Composition {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

    // Object to store our user properties
    this.current = null;
  }

  get(idx) {
    return this._$http({
      url: this._AppConstants.api + '/compositions',
      method: 'GET'
    }).then((res) => {
      var dat = res.data[0];
      for (var v of res.data){
        if( v.id === idx ){
          dat = v;
        }
      }
      return dat
		});
	}

  getList() {
    return this._$http({
      url: this._AppConstants.api + '/compositions',
      method: 'GET'
    }).then((res) => {
        let dat = _.map(res.data, (x) => x.id);
				console.log(dat);
				return dat
		});
	}
}
