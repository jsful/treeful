"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreefulNode = function TreefulNode(id) {
	var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	_classCallCheck(this, TreefulNode);

	var _id = id;
	var _data = data;
	var _callbacks = [];
	var _children = {};

	this.addNode = function (node) {
		var branch = {};
		branch[node.getId()] = node;
		_children = Object.assign(_children, branch);
		node.subscribe(callCallbacks);
	};

	this.setData = function (data) {
		//MAKE SURE THAT THERE IS NO TYPE MUTATION (except null)
		_data = data;
		callCallbacks(_data, _id);
	};

	this.getData = function () {
		return _data;
	};

	this.getId = function () {
		return _id;
	};

	this.subscribe = function (callback) {
		_callbacks.push(callback);
	};

	var callCallbacks = function callCallbacks(data, id) {
		_callbacks.forEach(function (item) {
			item(data, id);
		});
	};
};

exports.default = TreefulNode;