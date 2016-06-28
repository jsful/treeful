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
		Treeful.addNode('1');
		Treeful.addNode('2', 10, '1');
		const children = Object.keys(Treeful.getChildren('1'));
		expect(children).toContain('2');
		expect(Treeful.getData('2')).toEqual(10);
		Treeful.destroy();
	});

	it('allows chaining of addNode function', () => {
		expect(() => {
			Treeful.addNode('1').addNode('2').addNode('3', null, '1');
		}).toNotThrow();
		Treeful.destroy();
	});

	it('defaults to null if data is not passed to node', () => {
		Treeful.addNode('1');
		let data = Treeful.getData('1');
		expect(data).toEqual(null);
		Treeful.destroy();
	});

	it('adds a node to root if parent is not specified', () => {
		Treeful.addNode('1');
		let children = Object.keys(Treeful.getChildren('root'));
		expect(children).toContain('1');
		Treeful.destroy();
	});

	it('automatically creates a callback for every node', () => {
		Treeful.addNode('1');
		expect(Treeful.getCallbacks('1').length).toEqual(1);
		Treeful.destroy();
	});

	/** getData **/

	it('gets data from a node', () => {
		Treeful.addNode('1', 10);
		expect(Treeful.getData('1')).toEqual(10);
		Treeful.destroy();
	});

	/** setData **/

	it('sets data of a node', () => {
		Treeful.addNode('1');
		expect(Treeful.getData('1')).toEqual(null);
		Treeful.setData('1', 10);
		expect(Treeful.getData('1')).toEqual(10);
		Treeful.destroy();
	});

	/** subscribe **/

	it('calls callback functions when a node\'s data is changed, and passes data', () => {
		let d1 = 0;
		const cb1 = (data) => {
			d1 = data;
		};
		Treeful.addNode('1');
		Treeful.subscribe('1', cb1);
		Treeful.setData('1', 10);
		expect(d1).toEqual(10);
		Treeful.destroy();
	});

	it('tells you which node was updated when callback is called', () => {
		let n1 = '';
		const cb1 = (data, node) => {
			n1 = node;
		};
		Treeful.addNode('1');
		Treeful.addNode('2', 10, '1');
		Treeful.subscribe('1', cb1);
		Treeful.setData('2', 20);
		expect(n1).toEqual('2');
		Treeful.destroy();
	});

	it('allows multiple subscriptions on a single node', () => {
		Treeful.addNode('1', 10);
		Treeful.subscribe('1', () => {
			return true;
		});
		Treeful.subscribe('1', () => {
			return false;
		});
		let callbacks = Treeful.getCallbacks('1').length;
		expect(callbacks).toEqual(3);
		Treeful.destroy();
	});

	it('calls callback when a child node is updated', () => {
		let d1 = 0;
		const cb1 = (data) => {
			d1 = data;
		};
		Treeful.addNode('1');
		Treeful.addNode('2', 10, '1');
		Treeful.subscribe('1', cb1);
		Treeful.setData('2', 20);
		expect(d1).toEqual(20);
		Treeful.destroy();
	});

	it('calls callback when a child of a child node is updated', () => {
		let d1 = 0;
		const cb1 = (data) => {
			d1 = data;
		};
		Treeful.addNode('1');
		Treeful.addNode('2', 0, '1');
		Treeful.addNode('3', 0, '2');
		Treeful.subscribe('1', cb1);
		Treeful.setData('3', 10);
		expect(d1).toEqual(10);
		Treeful.destroy();
	});

	it('ignores updates from child when ignore flag is set', () => {
		let d1 = 0;
		const cb1 = (data) => {
			d1 = data;
		};
		Treeful.addNode('1');
		Treeful.addNode('2', 10, '1');
		Treeful.subscribe('1', cb1, true);
		Treeful.setData('2', 20);
		expect(d1).toEqual(0);
		Treeful.destroy();
	});

	it('returns an unsubscribe function when you call subscribe', () => {
		let d1 = 0;
		const cb1 = (data) => {
			d1 = data;
		};
		Treeful.addNode('1', 10);
		const unsub = Treeful.subscribe('1', cb1);
		unsub();
		Treeful.setData('1', 20);
		expect(Treeful.getCallbacks('1').length).toEqual(1);
		expect(d1).toEqual(0);
		Treeful.destroy();
	});

	it('unsubscribes only the specified callback function from the node', () => {
		let d1 = 0;
		let d2 = 0;
		const cb1 = (data) => {
			d1 = data;
		};
		const cb2 = (data) => {
			d2 = data;
		};
		Treeful.addNode('1', 10);
		let unsub1 = Treeful.subscribe('1', cb1);
		Treeful.subscribe('1', cb2);
		unsub1();
		Treeful.setData('1', 20);
		expect(Treeful.getCallbacks('1').length).toEqual(2);
		expect(d1).toEqual(0);
		expect(d2).toEqual(20);
		unsub1 = Treeful.subscribe('1', cb1);
		unsub1();
		Treeful.setData('1', 30);
		expect(Treeful.getCallbacks('1').length).toEqual(2);
		expect(d1).toEqual(0);
		expect(d2).toEqual(30);
		Treeful.destroy();
	});

	/** shake **/

	it('shakes a node without changing data', () => {
		let d1 = 0;
		const cb1 = () => {
			d1 = 10;
		};
		Treeful.addNode('1', 20);
		Treeful.subscribe('1', cb1);
		Treeful.shake('1');
		expect(d1).toEqual(10);
		expect(Treeful.getData('1')).toEqual(20);
		Treeful.destroy();
	});

	it('shakes parent node without changing data', () => {
		let d1 = 0;
		const cb1 = () => {
			d1 = 10;
		};
		Treeful.addNode('1', 20);
		Treeful.addNode('2', 30, '1');
		Treeful.addNode('3', 40, '2');
		Treeful.subscribe('1', cb1);
		Treeful.shake('3');
		expect(d1).toEqual(10);
		expect(Treeful.getData('3')).toEqual(40);
		Treeful.destroy();
	});

	/** destroy **/

	it('resets tree when destroy is called', () => {
		Treeful.addNode('1');
		Treeful.destroy();
		let children = Object.keys(Treeful.getChildren('root'));
		expect(children.length).toEqual(0);
	});

	/** checkIdExists **/

	it('throws if a node id doesn\'t exist', () => {
		Treeful.addNode('1');
		expect(() => {
			Treeful.getData('2');
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
			Treeful.addNode('1', () => {
				return false;
			});
		}).toThrow();
		Treeful.destroy();
	});

	/** checkDataType **/

	it('throws if data type does not match an expected type', () => {
		Treeful.addNode('1', true);
		expect(() => {
			Treeful.incrementData('1');
		}).toThrow();
		Treeful.destroy();
	});

	/** checkDuplicate **/

	it('throws if id is a duplicate', () => {
		Treeful.addNode('1');
		expect(() => {
			Treeful.addNode('1');
		}).toThrow();
		Treeful.destroy();
	});

	/** checkCallbackType **/

	it('throws if callback is not a function', () => {
		Treeful.addNode('1');
		expect(() => {
			Treeful.subscribe('1', 10);
		}).toThrow();
		Treeful.destroy();
	});

	/** checkTypeMutation **/

	it('throws if data mutation is attempted', () => {
		Treeful.addNode('1', 10);
		expect(() => {
			Treeful.setData('1', 'string');
		}).toThrow();
		Treeful.destroy();
	});

	/** incrementData / decrementData **/

	it('increments/decrements number when incrementData/decrementData is called', () => {
		Treeful.addNode('1', 0);
		Treeful.incrementData('1');
		expect(Treeful.getData('1')).toEqual(1);
		Treeful.incrementData('1', 2);
		expect(Treeful.getData('1')).toEqual(3);
		Treeful.decrementData('1');
		expect(Treeful.getData('1')).toEqual(2);
		Treeful.decrementData('1', 2);
		expect(Treeful.getData('1')).toEqual(0);
		Treeful.destroy();
	});

	/** toggleData **/

	it('toogles boolean when toggleData is called', () => {
		Treeful.addNode('1', true);
		Treeful.toggleData('1');
		expect(Treeful.getData('1')).toEqual(false);
		Treeful.toggleData('1');
		expect(Treeful.getData('1')).toEqual(true);
		Treeful.destroy();
	});

	/** pushData / popData **/

	it('pushes/pops item to an array when pushData/popData is called', () => {
		Treeful.addNode('1', []);
		Treeful.pushData('1', 10);
		Treeful.pushData('1', 20);
		expect(Treeful.getData('1')[0]).toEqual(10);
		expect(Treeful.getData('1')[1]).toEqual(20);
		expect(Treeful.popData('1')).toEqual(20);
		expect(Treeful.getData('1').length).toEqual(1);
		Treeful.destroy();
	});
});
