'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _treefulNode = require('./treeful-node');

var _treefulNode2 = _interopRequireDefault(_treefulNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _treefulInstance = null;

var Treeful = function Treeful() {
	var _this = this;

	_classCallCheck(this, Treeful);

	if (_treefulInstance) {
		return _treefulInstance;
	}
	_treefulInstance = this;

	var _tree = {};
	var _ids = [];

	this.addRootNode = function () {
		//CHECK TO MAKE SURE ROOT NODE ISNT CREATED
		var branch = {};
		branch['root'] = new _treefulNode2.default('root');
		_tree = Object.assign({}, branch);
		_ids.push('root');
	};

	this.addNode = function (id) {
		var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var parent = arguments.length <= 2 || arguments[2] === undefined ? 'root' : arguments[2];

		console.log(_ids, id + ' to ' + parent);
		if (_ids.indexOf(id) > -1) {
			console.error(new Error('Cannot use duplicate node IDs'));
			return;
		}
		var node = new _treefulNode2.default(id, data);
		var branch = {};
		branch[id] = node;
		_tree = Object.assign(_tree, branch);
		_ids.push(id);
		_tree[parent].addNode(node);
		return _this;
	};

	this.setData = function (id, data) {
		_tree[id].setData(data);
	};

	this.getData = function (id) {
		return _tree[id].getData();
	};

	this.getTree = function () {
		return _tree['root'];
	};

	this.subscribe = function (id, callback) {
		_tree[id].subscribe(callback);
	};

	this.destroy = function () {
		_tree = {};
		_ids = [];
		_treefulInstance = null;
	};

	this.addRootNode();
};

exports.default = Treeful;
;