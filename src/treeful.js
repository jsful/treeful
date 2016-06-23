import TreefulNode from './treeful-node';

let _treefulInstance = null;

export class Treeful {
	constructor() {
		if(_treefulInstance) {
			return _treefulInstance;
		}
		_treefulInstance = this;
		let _tree;

		this.addNode = (id, data = null, parent = 'root') => {
			checkIdType(id);
			checkDuplicate(id);
			checkIfDataIsFunction(data);
			checkIdExists(parent);

			const node = new TreefulNode(id, data);
			const branch = {};
			branch[id] = node;
			_tree = Object.assign(_tree, branch);
			_tree[parent].addNode(node);

			return this;
		};

		this.getData = (id) => {
			checkIdType(id);
			checkIdExists(id);

			return _tree[id].getData();
		};

		this.setData = (id, data) => {
			checkIdType(id);
			checkIdExists(id);
			checkIfDataIsFunction(data);
			checkTypeMutation(id, data);

			_tree[id].setData(data);
		};

		this.subscribe = (id, callback, ignoreChildren = false) => {
			checkIdType(id);
			checkIdExists(id);
			checkCallbackType(callback);

			return _tree[id].subscribe(callback, ignoreChildren);
		};

		this.destroy = () => {
			init();
		};

		this.getTree = () => _tree;

		this.getChildren = (id) => _tree[id].getChildren();

		this.getCallbacks = (id) => _tree[id].getCallbacks();

		this.incrementData = (id, value = 1) => {
			checkIdType(id);
			checkIdExists(id);
			const data = this.getData(id);
			checkDataType(data, 'number');
			this.setData(id, data + value);
		};

		this.decrementData = (id, value = 1) => {
			checkIdType(id);
			checkIdExists(id);
			const data = this.getData(id);
			checkDataType(data, 'number');
			this.setData(id, data - value);
		};

		this.toggleData = (id) => {
			checkIdType(id);
			checkIdExists(id);
			const data = this.getData(id);
			checkDataType(data, 'boolean');
			this.setData(id, !data);
		};

		this.pushData = (id, item) => {
			checkIdType(id);
			checkIdExists(id);
			const data = this.getData(id);
			checkDataType(data, 'array');
			data.push(item);
			this.setData(id, data);
		};

		this.popData = (id) => {
			checkIdType(id);
			checkIdExists(id);
			const data = this.getData(id);
			checkDataType(data, 'array');
			const removedArray = data.splice(data.length - 1, 1);
			this.setData(id, data);
			return removedArray[0];
		};

		const init = () => {
			_tree = {};
			addRootNode();
		};

		const addRootNode = () => {
			const branch = {};
			branch['root'] = new TreefulNode('root');
			_tree = Object.assign({}, branch);
		};

		const checkIdExists = (id) => {
			if(Object.keys(_tree).indexOf(id) < 0) {
				throw new Error('Node with id \'' + id + '\' is not found.');
			}
		};

		const checkIdType = (id) => {
			if(!isType(id, 'string')) {
				throw new TypeError('Id must be a string.');
			}
		};

		const checkIfDataIsFunction = (data) => {
			if(isType(data, 'function')) {
				throw new TypeError('Data cannot be a function.');
			}
		};

		const checkDataType = (data, type) => {
			if(!isType(data, type)) {
				throw new TypeError('Data type must be a(n) ' + type + '.');
			}
		};

		const checkDuplicate = (id) => {
			if(Object.keys(_tree).indexOf(id) > -1) {
				throw new Error('Cannot use duplicate id \'' + id + '\'.');
			}
		};

		const checkCallbackType = (callback) => {
			if(!isType(callback, 'function')) {
				throw new TypeError('Callback must be a function.');
			}
		};

		const checkTypeMutation = (id, data) => {
			if(!isType(this.getData(id), null) && !isType(data, getType(this.getData(id)))) {
				throw new Error('Data type cannot be mutated from ' + getType(this.getData(id)) + ' to ' + getType(data) + '.');
			}
		};

		const getType = (e) => {
			return {}.toString.call(e).toLowerCase().split(' ')[1].replace(']', '');
		};

		const isType = (e, type) => {
			return {}.toString.call(e).toLowerCase().split(' ')[1].replace(']', '').indexOf(type) > -1;
		};

		init();
	}
};

export default new Treeful();