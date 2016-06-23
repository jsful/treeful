import Treeful from '../src/treeful';
import expect from 'expect';

describe('treeful', () => {

	/** constructor **/

	it('exposes the public api without instanciating', () => {
		const methods = Object.keys(Treeful);
		expect(methods).toContain('addNode');
		expect(methods).toContain('setData');
		expect(methods).toContain('getData');
		expect(methods).toContain('subscribe');
		expect(methods).toContain('destroy');
	});

	it('creates the root node automatically', () => {
		const tree = Treeful.getTree();
		const nodes = Object.keys(tree);
		expect(nodes).toContain('root');
	});

	/** addNode **/

	it('adds a node to a parent node with data', () => {
		Treeful.addNode('test');
		Treeful.addNode('test1', 1, 'test');
		const children = Object.keys(Treeful.getChildren('test'));
		expect(children).toContain('test1');
		expect(Treeful.getData('test1')).toEqual(1);
		Treeful.destroy();
	});

	it('allows chaining of addNode function', () => {
		expect(() => {
			Treeful.addNode('test').addNode('test2').addNode('test3', null, 'test');
		}).toNotThrow();
		Treeful.destroy();
	});

	it('defaults to null if data is not passed to node', () => {
		Treeful.addNode('test');
		let data = Treeful.getData('test');
		expect(data).toEqual(null);
		Treeful.destroy();
	});

	it('adds a node to root if parent is not specified', () => {
		Treeful.addNode('test');
		let children = Object.keys(Treeful.getChildren('root'));
		expect(children).toContain('test');
		Treeful.destroy();
	});

	it('automatically creates a callback for every node', () => {
		Treeful.addNode('test');
		expect(Treeful.getCallbacks('test').length).toEqual(1);
		Treeful.destroy();
	});

	/** getData **/

	it('gets data from a node', () => {
		Treeful.addNode('test', 1);
		expect(Treeful.getData('test')).toEqual(1);
		Treeful.destroy();
	});

	/** setData **/

	it('sets data of a node', () => {
		Treeful.addNode('test');
		expect(Treeful.getData('test')).toEqual(null);
		Treeful.setData('test', 1);
		expect(Treeful.getData('test')).toEqual(1);
		Treeful.destroy();
	});

	/** subscribe **/

	it('calls callback functions when a node\'s data is changed, and passes data', () => {
		let callbackData = 0;
		const cb = (data) => {
			callbackData = data;
		};
		Treeful.addNode('test');
		Treeful.subscribe('test', cb);
		Treeful.setData('test', 50);
		expect(callbackData).toEqual(50);
		Treeful.destroy();
	});

	it('tells you which node was updated when callback is called', () => {
		let callbackNode = '';
		const cb = (data, node) => {
			callbackNode = node;
		};
		Treeful.addNode('test');
		Treeful.addNode('child', 0, 'test');
		Treeful.subscribe('test', cb);
		Treeful.setData('child', 50);
		expect(callbackNode).toEqual('child');
		Treeful.destroy();
	});

	it('allows multiple subscriptions on a single node', () => {
		Treeful.addNode('test', 50);
		Treeful.subscribe('test', () => {
			console.log('sub1');
		});
		Treeful.subscribe('test', () => {
			console.log('sub2');
		});
		let callbacks = Treeful.getCallbacks('test').length;
		expect(callbacks).toEqual(3);
		Treeful.destroy();
	});

	it('calls callback when a child node is updated', () => {
		let callbackData = 0;
		const cb = (data) => {
			callbackData = data;
		};
		Treeful.addNode('test');
		Treeful.addNode('child', 0, 'test');
		Treeful.subscribe('test', cb);
		Treeful.setData('child', 50);
		expect(callbackData).toEqual(50);
		Treeful.destroy();
	});

	it('ignores child callbacks if ignore flag is set', () => {
		let callbackData = 0;
		const cb = (data) => {
			callbackData = data;
		};
		Treeful.addNode('test');
		Treeful.addNode('child', 0, 'test');
		Treeful.subscribe('test', cb, true);
		Treeful.setData('child', 50);
		expect(callbackData).toEqual(0);
		Treeful.destroy();
	});

	it('returns an unsubscribe function when you call subscribe', () => {
		let callbackData = 0;
		const cb = (data) => {
			callbackData = data;
		};
		Treeful.addNode('test', 0);
		const unsub = Treeful.subscribe('test', cb);
		unsub();
		Treeful.setData('test', 50);
		expect(Treeful.getCallbacks('test').length).toEqual(1);
		expect(callbackData).toEqual(0);
		Treeful.destroy();
	});

	it('unsubscribes only the specified callback function from the node', () => {
		let callbackData1 = 0;
		let callbackData2 = 0;
		const cb1 = (data) => {
			callbackData1 = data;
		};
		const cb2 = (data) => {
			callbackData2 = data;
		};
		Treeful.addNode('test', 0);
		let unsub1 = Treeful.subscribe('test', cb1);
		Treeful.subscribe('test', cb2);
		unsub1();
		Treeful.setData('test', 1);
		expect(Treeful.getCallbacks('test').length).toEqual(2);
		expect(callbackData1).toEqual(0);
		expect(callbackData2).toEqual(1);
		unsub1 = Treeful.subscribe('test', cb1);
		unsub1();
		Treeful.setData('test', 2);
		expect(Treeful.getCallbacks('test').length).toEqual(2);
		expect(callbackData1).toEqual(0);
		expect(callbackData2).toEqual(2);
		Treeful.destroy();
	});

	/** destroy **/

	it('resets tree when destroy is called', () => {
		Treeful.addNode('test');
		Treeful.destroy();
		let children = Object.keys(Treeful.getChildren('root'));
		expect(children.length).toEqual(0);
	});

	/** checkIdExists **/

	it('throws if a node id doesn\'t exist', () => {
		Treeful.addNode('test');
		expect(() => {
			Treeful.getData('node');
		}).toThrow();
		Treeful.destroy();
	});

	/** checkIdType **/

	it('throws if id is not a string', () => {
		expect(() => {
			Treeful.addNode(1);
		}).toThrow();
		Treeful.destroy();
	});

	/** checkIfDataIsFunction **/

	it('throws if a function is passed as data', () => {
		expect(() => {
			Treeful.addNode('test', () => {
				console.log('');
			});
		}).toThrow();
		Treeful.destroy();
	});

	/** checkDataType **/

	it('throws if data type does not match an expected type', () => {
		Treeful.addNode('test', true);
		expect(() => {
			Treeful.incrementData('test');
		}).toThrow();
		Treeful.destroy();
	});

	/** checkDuplicate **/

	it('throws if id is a duplicate', () => {
		Treeful.addNode('test');
		expect(() => {
			Treeful.addNode('test');
		}).toThrow();
		Treeful.destroy();
	});

	/** checkCallbackType **/

	it('throws if callback is not a function', () => {
		Treeful.addNode('test');
		expect(() => {
			Treeful.subscribe('test', 1);
		}).toThrow();
		Treeful.destroy();
	});

	/** checkTypeMutation **/

	it('throws if data mutation is attempted', () => {
		Treeful.addNode('test', 1);
		expect(() => {
			Treeful.setData('test', 'string');
		}).toThrow();
		Treeful.destroy();
	});

	/** incrementData / decrementData **/

	it('increments/decrements number when incrementData/decrementData is called', () => {
		Treeful.addNode('test', 0);
		Treeful.incrementData('test');
		expect(Treeful.getData('test')).toEqual(1);
		Treeful.incrementData('test', 2);
		expect(Treeful.getData('test')).toEqual(3);
		Treeful.decrementData('test');
		expect(Treeful.getData('test')).toEqual(2);
		Treeful.decrementData('test', 2);
		expect(Treeful.getData('test')).toEqual(0);
		Treeful.destroy();
	});

	/** toggleData **/

	it('toogles boolean when toggleData is called', () => {
		Treeful.addNode('test', true);
		Treeful.toggleData('test');
		expect(Treeful.getData('test')).toEqual(false);
		Treeful.toggleData('test');
		expect(Treeful.getData('test')).toEqual(true);
		Treeful.destroy();
	});

	/** pushData / popData **/

	it('pushes/pops item to an array when pushData/popData is called', () => {
		Treeful.addNode('test', []);
		Treeful.pushData('test', 1);
		Treeful.pushData('test', 2);
		expect(Treeful.getData('test')[0]).toEqual(1);
		expect(Treeful.getData('test')[1]).toEqual(2);
		expect(Treeful.popData('test')).toEqual(2);
		expect(Treeful.getData('test').length).toEqual(1);
		Treeful.destroy();
	});
});
