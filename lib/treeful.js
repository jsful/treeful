'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Treeful = undefined;

var _treefulNode = require('./treeful-node');

var _treefulNode2 = _interopRequireDefault(_treefulNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _treefulInstance = null;

var Treeful = exports.Treeful = function Treeful() {
	var _this = this;

	_classCallCheck(this, Treeful);

	if (_treefulInstance) {
		return _treefulInstance;
	}
	_treefulInstance = this;
	var _tree = void 0;

	this.addNode = function (id) {
		var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var parent = arguments.length <= 2 || arguments[2] === undefined ? 'root' : arguments[2];

		checkIdType(id);
		checkDuplicate(id);
		checkDataType(data);
		checkIdExists(parent);

		var node = new _treefulNode2.default(id, data);
		var branch = {};
		branch[id] = node;
		_tree = Object.assign(_tree, branch);
		_tree[parent].addNode(node);

		return _this;
	};

	this.setData = function (id, data) {
		checkIdType(id);
		checkIdExists(id);
		checkDataType(data);
		checkTypeMutation(id, data);

		_tree[id].setData(data);
	};

	this.getData = function (id) {
		checkIdType(id);
		checkIdExists(id);

		return _tree[id].getData();
	};

	this.subscribe = function (id, callback) {
		var ignoreChildren = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

		checkIdType(id);
		checkIdExists(id);
		checkCallbackType(callback);

		_tree[id].subscribe(callback, ignoreChildren);
	};

	this.getTree = function () {
		return _tree;
	};

	this.destroy = function () {
		init();
	};

	var init = function init() {
		_tree = {};
		addRootNode();
	};

	var addRootNode = function addRootNode() {
		var branch = {};
		branch['root'] = new _treefulNode2.default('root');
		_tree = Object.assign({}, branch);
	};

	var checkIdExists = function checkIdExists(id) {
		if (Object.keys(_tree).indexOf(id) < 0) {
			throw new Error('Node with id \'' + id + '\' is not found.');
		}
	};

	var checkIdType = function checkIdType(id) {
		if (!isType(id, 'string')) {
			throw new TypeError('Id must be a string.');
		}
	};

	var checkDataType = function checkDataType(data) {
		if (isType(data, 'function')) {
			throw new TypeError('Data cannot be a function.');
		}
	};

	var checkDuplicate = function checkDuplicate(id) {
		if (Object.keys(_tree).indexOf(id) > -1) {
			throw new Error('Cannot use duplicate id \'' + id + '\'.');
		}
	};

	var checkCallbackType = function checkCallbackType(callback) {
		if (!isType(callback, 'function')) {
			throw new TypeError('Callback must be a function.');
		}
	};

	var checkTypeMutation = function checkTypeMutation(id, data) {
		if (!isType(_this.getData(id), null) && !isType(data, getType(_this.getData(id)))) {
			throw new Error('Data type cannot be mutated from ' + getType(_this.getData(id)) + ' to ' + getType(data) + '.');
		}
	};

	var getType = function getType(e) {
		return {}.toString.call(e).toLowerCase().split(' ')[1].replace(']', '');
	};

	var isType = function isType(e, type) {
		return {}.toString.call(e).toLowerCase().split(' ')[1].replace(']', '').indexOf(type) > -1;
	};

	init();
};

;

exports.default = new Treeful();