export default class TreefulNode {
	constructor(id, data = null) {
		let _id = id;
		let _data = data;
		let _callbacks = [];
		let _children = {};
		let _hashId = 0;
		
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

		this.trigger = () => {
			callCallbacks(_data, _id, true, true);
		}

		this.getId = () => _id;

		this.getData = () => _data;

		this.getChildren = () => _children;

		this.getCallbacks = () => _callbacks;

		this.subscribe = (callback, ignoreChildren = false) => {
			const hashId = _hashId;
			_callbacks.push({hashId, callback, ignoreChildren});
			_hashId++;
			return () => {
				unsubscribe(hashId);
			};
		};

		const unsubscribe = (index) => {
			for(let i=0; i<_callbacks.length; i++) {
				if(_callbacks[i].hashId == index) {
					_callbacks.splice(i, 1);
					break;
				}
			}
		};

		const callCallbacks = (data, id, self = false, ignoreData = false) => {
			_callbacks.forEach((item) => {
				if(!item.ignoreChildren || self) {
					if(!ignoreData) {
						item.callback(data, id);
					} else {
						item.callback();
					}
				}
			});
		};
	}
}