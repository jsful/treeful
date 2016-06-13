import TreefulNode from './treeful-node';

let _treefulInstance = null;

export default class Treeful {
	constructor() {
		if(_treefulInstance) {
			return _treefulInstance;	
		}
		_treefulInstance = this;

		let _tree = {};
		let _ids = [];
		
		this.addRootNode = () => {
			//CHECK TO MAKE SURE ROOT NODE ISNT CREATED
			const branch = {};
			branch['root'] = new TreefulNode('root');
			_tree = Object.assign({}, branch);
			_ids.push('root');
		};

		this.addNode = (id, data = null, parent = 'root') => {
			//if id is not a string? if data is a function? if parent doens't exist?
			if(_ids.indexOf(id) > -1) {
				throw new Error('Cannot use duplicate node IDs');
				return;
			}
			const node = new TreefulNode(id, data);
			const branch = {};
			branch[id] = node;
			_tree = Object.assign(_tree, branch);
			_ids.push(id);
			_tree[parent].addNode(node);
			return this;
		};

		this.setData = (id, data) => {
			//MAKE SURE THAT THERE IS NO TYPE MUTATION (except null)
			_tree[id].setData(data);
		};

		this.getData = id => {
			//if id is invalid? not found?
			return _tree[id].getData();
		}

		this.getTree = () => _tree['root'];

		this.subscribe = (id, callback) => {
			//if id is invalid? not found?
			_tree[id].subscribe(callback);
		};

		this.destroy = () => {
			_tree = {};
			_ids = [];
			_treefulInstance = null;
		};

		this.addRootNode();
	}
};