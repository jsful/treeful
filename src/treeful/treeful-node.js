export default class TreefulNode {
	constructor(id, data = null) {
		let _id = id;
		let _data = data;
		let _callbacks = [];
		let _children = {};
		
		this.addNode = node => {
			const branch = {};
			branch[node.getId()] = node;
			_children = Object.assign(_children, branch);
			node.subscribe(callCallbacks);
		};

		this.setData = data => {
			//MAKE SURE THAT THERE IS NO TYPE MUTATION (except null)
			_data = data;
			callCallbacks(_data, _id);
		};

		this.getData = () => _data;

		this.getId = () => _id;

		this.subscribe = callback => {
			_callbacks.push(callback);
		};

		const callCallbacks = (data, id) => {
			_callbacks.forEach((item) => {
				item(data, id);
			});
		};
	}
}