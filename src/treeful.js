import TreefulNode from './treeful-node';

let _treefulInstance = null;

class Treeful {
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

			_tree[id].subscribe(callback, ignoreChildren);
		};

		this.print = (_id = 'root') => {
			let stack = [];
			let output = '';

			const iterate = (id, depth) => {
				if(id != _id) {
					output += '\n\n';
				}

				const data = _tree[id].getData();
				output += printTabs(depth);
				if(isType(data, 'array')) {
					output += id + ': [ ' + data.join(', ') + ' ]';
				} else if(isType(data, 'object')) {
					output += id + ': ' + printObject(data, depth);
				} else {
					output += id + ': ' + data;
				}

				Object.keys(_tree[id].getChildren()).forEach(childId => {
					push(childId, depth + 1);
				});

				if(stack.length > 0) {
					const obj = pop();
					iterate(obj.id, obj.depth);
				}
			};

			const push = (id, depth) => {
				stack.splice(0, 0, { id, depth });
			};

			const pop = () => {
				const obj = stack[0];
				stack = stack.slice(1);
				return obj;
			};

			const printObject = (obj, depthg) => {
				let objectString = '{\n';
				Object.keys(obj).forEach(key => {
					objectString += printTabs(depth + 1);
					if(isType(obj[key], 'object')) {
						objectString += key + ': ' + printObject(obj[key], depth + 1) + '\n';
					} else {
						objectString += key + ': ' + obj[key] + '\n';
					}
				});
				objectString += printTabs(depth) + '}';
				return objectString;
			};

			const printTabs = depth => {
				let tabs = '';
				for(let i=0; i<depth; i++) {
					tabs += '\t';
				}
				return tabs;
			};

			iterate(_id, 0);
			console.log(output);
		};

		this.destroy = () => {
			init();
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