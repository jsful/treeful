
var __TREEFUL_INSTANCE = null;
class Treeful {

	constructor() {
		if(!__TREEFUL_INSTANCE) {
	
			__TREEFUL_INSTANCE = this;
			this._tree = {};
			this.ids = [];
			// this._refs = {};
			this.addRootNode();

		}

		return __TREEFUL_INSTANCE;

	}

	addRootNode() {
		//CHECK TO MAKE SURE ROOT NODE ISNT CREATED
		let node = new TreefulNode('root');

		let id = node.getId();
		let temp = {};
		temp[id] = node;
		this.ids.push('root');

		this._tree = Object.assign(this._tree, temp);
	}

	getData(id) {
		return this._tree[id].getData();
	}

	subscribe(id, callback) {

		this._tree[id].subscribe(callback);

	}

	setData(id, data) {
		this._tree[id].setData(data);
	}

	addNode(id, data = null, parent = 'root') {
		if(this.ids.indexOf(id) > -1) {
			console.error(new Error("Cannot use duplicate node IDs"));
			return;
		}
		this.ids.push(id);
		let node = new TreefulNode(id, data);
		let temp = {};
		temp[id] = node;

		this._tree = Object.assign(this._tree, temp);

		this._tree[parent].addNode(node);
		return node;
	}

	getTree() {
		return this._tree['root'];
	}

	destroy() {
		this.ids = [];
		this._tree = {};
		__TREEFUL_INSTANCE = null;
	}

}

class TreefulNode {

	constructor(id, data = null) {

		this.id = id;
		this.children = {};
		this.data = data;
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

	setData(data) {
		//MAKE SURE THAT THERE IS NO TYPE MUTATION (except null)

		this.data = data;
		this.callCallbacks(data, this.id);
	}

	getData() {
		return this.data;
	}
	
	callCallbacks(data, id) {

		this.callbacks.forEach((item) => {
			item(data, id);
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


