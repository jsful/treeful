import { Treeful } from './treeful';

class TreefulDev extends Treeful {
	constructor() {
		super();
		
		const parentSetData = this.setData;

		this.setData = (id, data) => {
			parentSetData(id, data);
			this.print();
		};

		this.print = (_id = 'root') => {
			let _tree = this.getTree();
			let stack = [];
			let output = '';

			const iterate = (id, depth) => {
				if(id != _id) {
					output += '\n\n';
				}
				output += printTabs(depth) + printPerType(id, _tree[id].getData(), depth);

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

			const printObject = (obj, depth) => {
				let objectString = '{\n';
				Object.keys(obj).forEach(key => {
					objectString += printTabs(depth + 1) + printPerType(key, obj[key], depth + 1) + '\n';
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

			const printPerType = (key, value, depth) => {
				let output = '';
				if(key != null) {
					output += key + ': ';
				}
				if(isType(value, 'array')) {
					output += '[';
					for(let i=0; i<value.length; i++) {
						output += '\n' + printTabs(depth + 1) + printPerType(null, value[i], depth + 1);
						if(i < value.length - 1) {
							output += ',';
						}
					}
					output += '\n' + printTabs(depth) + ']';
				} else if(isType(value, 'object')) {
					output += printObject(value, depth);
				} else {
					output += value;
				}
				return output;
			};

			iterate(_id, 0);
			console.log(output);
		};

		const isType = (e, type) => {
			return {}.toString.call(e).toLowerCase().split(' ')[1].replace(']', '').indexOf(type) > -1;
		};
	}
}

export default new TreefulDev();