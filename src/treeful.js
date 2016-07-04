import TreefulNode from './treeful-node';

let _treefulInstance = null;

class Treeful {
	constructor() {
		if(_treefulInstance) {
			return _treefulInstance;
		}
		_treefulInstance = this;
		let _tree;
		let _dev;

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
			if(_dev) {
				console.log(this.toString());
			}
		};

		this.shake = (id) => {
			checkIdType(id);
			checkIdExists(id);
			_tree[id].setData(_tree[id].getData());
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

		this.enableDev = () => {
			_dev = true;
		};

		this.toString = (id = 'root') => {
			checkIdType(id);
			checkIdExists(id);
			return getTreeString(id, 0, '', '', []);
		};

		this.incrementData = (id, value = 1) => {
			checkIdType(id);
			checkIdExists(id);
			const number = this.getData(id);
			checkDataType(number, 'number');
			this.setData(id, number + value);
		};

		this.decrementData = (id, value = 1) => {
			checkIdType(id);
			checkIdExists(id);
			const number = this.getData(id);
			checkDataType(number, 'number');
			this.setData(id, number - value);
		};

		this.toggleData = (id) => {
			checkIdType(id);
			checkIdExists(id);
			const boolean = this.getData(id);
			checkDataType(boolean, 'boolean');
			this.setData(id, !boolean);
		};

		this.pushData = (id, data) => {
			checkIdType(id);
			checkIdExists(id);
			const array = this.getData(id);
			checkDataType(array, 'array');
			array.push(data);
			this.setData(id, array);
		};

		this.popData = (id) => {
			checkIdType(id);
			checkIdExists(id);
			const array = this.getData(id);
			checkDataType(array, 'array');
			const popArray = array.splice(array.length - 1, 1);
			this.setData(id, array);
			return popArray[0];
		};

		this.isDev = () => _dev;

		this.getTree = () => _tree;

		this.getChildren = (id) => _tree[id].getChildren();

		this.getCallbacks = (id) => _tree[id].getCallbacks();

		const init = () => {
			_tree = {};
			_dev = false;
			addRootNode();
		};

		const addRootNode = () => {
			const branch = {};
			branch['root'] = new TreefulNode('root');
			_tree = Object.assign({}, branch);
		};

		const getTreeString = (id, depth, outputString, prepand, stack) => {
			outputString += prepand + printTabs(depth) + printPerType(id, _tree[id].getData(), depth);
			Object.keys(_tree[id].getChildren()).forEach((childId) => {
				stack.splice(0, 0, { id: childId, depth: depth + 1 });
			});
			if(stack.length > 0) {
				const obj = stack.splice(0, 1)[0];
				outputString = getTreeString(obj.id, obj.depth, outputString, '\n\n', stack);
			}
			return outputString;
		};

		const printObject = (obj, depth) => {
			let outputString = '{\n';
			Object.keys(obj).forEach((key) => {
				outputString += printTabs(depth + 1) + printPerType(key, obj[key], depth + 1) + '\n';
			});
			outputString += printTabs(depth) + '}';
			return outputString;
		};

		const printTabs = (depth) => {
			let outputString = '';
			for(let i=0; i<depth; i++) {
				outputString += '\t';
			}
			return outputString;
		};

		const printPerType = (key, value, depth) => {
			let outputString = '';
			if(key != null) {
				outputString += key + ': ';
			}
			if(isType(value, 'array')) {
				outputString += '[';
				for(let i=0; i<value.length; i++) {
					outputString += '\n' + printTabs(depth + 1) + printPerType(null, value[i], depth + 1);
					if(i < value.length - 1) {
						outputString += ',';
					}
				}
				outputString += '\n' + printTabs(depth) + ']';
			} else if(isType(value, 'object')) {
				outputString += printObject(value, depth);
			} else {
				outputString += value;
			}
			return outputString;
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

		const getType = (e) => Object.prototype.toString.call(e).toLowerCase().split(' ')[1].replace(']', '');

		const isType = (e, type) => getType(e).indexOf(type) > -1;

		init();
	}
};

export default new Treeful();