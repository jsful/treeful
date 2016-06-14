import { Treeful } from './treeful';

class TreefulDev extends Treeful {
	constructor() {
		super();

		this.print = (_id = 'root') => {
			let _tree = this.getTree();
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

			const printObject = (obj, depth) => {
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

		const isType = (e, type) => {
			return {}.toString.call(e).toLowerCase().split(' ')[1].replace(']', '').indexOf(type) > -1;
		};
	}
}

export default new TreefulDev();