export default class TreefulNode {
	constructor(id, data = null) {
		let _id = id;
		let _data = data;
		let _callbacks = [];
		let _children = {};
		
		this.addNode = (node) => {
			const branch = {};
			branch[node.getId()] = node;
			_children = Object.assign(_children, branch);
			node.subscribe(callCallbacks);
		};

		this.setData = (data) => {
			_data = data;
			callCallbacks(_data, _id, true);
		};

		this.getId = () => _id;

		this.getData = () => _data;

		this.getChildren = () => _children;

		this.getCallbacks = () => _callbacks;

		this.subscribe = (callback, ignoreChildren = false) => {
			_callbacks.push({callback, ignoreChildren});
			return () => {
				unsubscribe(_callbacks.length - 1);
			};
		};

		const unsubscribe = (index) => {
			_callbacks.splice(index, 1);
		};

		const callCallbacks = (data, id, self) => {
			_callbacks.forEach((item) => {
				if(!item.ignoreChildren || self) {
					item.callback(data, id);
				}
			});
		};
	}
}