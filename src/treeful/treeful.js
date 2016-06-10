
var __TREEFUL_INSTANCE = null;
class Treeful {

	constructor() {

		console.log('constructor: Treeful');

		if(!__TREEFUL_INSTANCE) {
	
			__TREEFUL_INSTANCE = this;
			this._tree = {};
			this._refs = {};

		}

		return __TREEFUL_INSTANCE;

	}

	addParentNode(node) {
		let id = node.getId();
		let temp = {};
		temp[id] = node;

		this._tree = Object.assign(this._tree, temp);
		this._refs = Object.assign(this._refs, temp);

		return node;

	}

	subscribe(nodeId, callback) {

		this._refs[nodeId].subscribe(callback);

	}

	setValue(nodeId, value) {
		this._refs[nodeId].setValue(value);
	}

	addChildNode(parent, node) {

		let id = node.getId();
		let temp = {};
		temp[id] = node;

		this._refs = Object.assign(this._refs, temp);

		this._refs[parent].addNode(node);

		return node;

	}

	printTree() {

		console.log(this._tree);

	}

}

class TreefulNode {

	constructor(id, value) {

		this.id = id;
		this.children = {};
		this.value = value;
		this.callbacks = [];
	}

	addNode(node) {
		let id = node.getId();
		let temp = {};
		temp[id] = node;

		node.subscribe(this.callCallbacks.bind(this));
	
		this.children = Object.assign(this.children, temp);

		return this;
	}

	setValue(value) {
		this.value = value;
		this.callCallbacks(value);
	}

	callCallbacks(value) {

		this.callbacks.forEach((item) => {
			item(value);
		});

	}

	subscribe(callback) {
		
		this.callbacks.push(callback);

	}

	getId() {

		return this.id;

	}

}

export {Treeful, TreefulNode};