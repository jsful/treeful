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
			checkDataType(data);
			checkIdExists(parent);

			const node = new TreefulNode(id, data);
			const branch = {};
			branch[id] = node;
			_tree = Object.assign(_tree, branch);
			_tree[parent].addNode(node);

			return this;
		};

		this.setData = (id, data) => {
			checkIdType(id);
			checkIdExists(id);
			checkDataType(data);
			checkTypeMutation(id, data);

			_tree[id].setData(data);
		};

		this.getData = id => {
			checkIdType(id);
			checkIdExists(id);

			return _tree[id].getData();
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

		const init = () => {
			_tree = {};
			addRootNode();
		};

		const addRootNode = () => {
			const branch = {};
			branch['root'] = new TreefulNode('root');
			_tree = Object.assign({}, branch);
		};

		const checkIdExists = id => {
			if(Object.keys(_tree).indexOf(id) < 0) {
				throw new Error('Node with id \'' + id + '\' is not found.');
			}
		};

		const checkIdType = id => {
			if(!isType(id, 'string')) {
				throw new TypeError('Id must be a string.');
			}
		};

		const checkDataType = data => {
			if(isType(data, 'function')) {
				throw new TypeError('Data cannot be a function.');
			}
		};

		const checkDuplicate = id => {
			if(Object.keys(_tree).indexOf(id) > -1) {
				throw new Error('Cannot use duplicate id \'' + id + '\'.');
			}
		};

		const checkCallbackType = callback => {
			if(!isType(callback, 'function')) {
				throw new TypeError('Callback must be a function.');
			}
		};

		const checkTypeMutation = (id, data) => {
			if(!isType(this.getData(id), null) && !isType(data, getType(this.getData(id)))) {
				throw new Error('Data type cannot be mutated from ' + getType(this.getData(id)) + ' to ' + getType(data) + '.');
			}
		};

		const getType = e => {
			return {}.toString.call(e).toLowerCase().split(' ')[1].replace(']', '');
		};

		const isType = (e, type) => {
			return {}.toString.call(e).toLowerCase().split(' ')[1].replace(']', '').indexOf(type) > -1;
		};

		init();
	}
};

export default new Treeful();