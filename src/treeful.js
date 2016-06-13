import TreefulNode from './treeful-node';

let _treefulInstance = null;

class Treeful {
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
			console.log(_ids, id + ' to ' + parent);
			if(_ids.indexOf(id) > -1) {
				console.error(new Error('Cannot use duplicate node IDs'));
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
			_tree[id].setData(data);
		};

		this.getData = id => _tree[id].getData();

		this.getTree = () => _tree['root'];

		this.subscribe = (id, callback) => {
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

export default new Treeful();