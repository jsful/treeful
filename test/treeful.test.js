import Treeful from '../src/treeful';
import expect from 'expect';

describe('treeful', () => {
	it('exposes the public api without instanciating', () => {
		let methods = Object.keys(Treeful);
		expect(methods).toContain('addNode');
		expect(methods).toContain('setData');
		expect(methods).toContain('getData');
		expect(methods).toContain('subscribe');
		expect(methods).toContain('destroy');
	});

	it('resets tree when destroy is called', () => {
		Treeful.addNode('test');
		Treeful.destroy();
		let children = Object.keys(Treeful.getChildren('root'));
		expect(children.length).toEqual(0);
	});

	it('creates the root node automatically', () => {
		let tree = Treeful.getTree();
		let nodes = Object.keys(tree);
		expect(nodes).toContain('root');
	});

	it('adds a node to root if parent is not specified', () => {
		Treeful.addNode('test');
		let children = Object.keys(Treeful.getChildren('root'));
		expect(children).toContain('test');
		Treeful.destroy();
	});

	it('throws if parent doesn\'t exist', () => {
		Treeful.addNode('test');
		expect(() => {
			Treeful.addNode('test1', 0, 'test2');
		}).toThrow();
		Treeful.destroy();
	});

	it('throws if id is a duplicate', () => {
		Treeful.addNode('test');
		expect(() => {
			Treeful.addNode('test');
		}).toThrow();
		Treeful.destroy();
	});

	it('defaults to null if data is not passed to node', () => {
		Treeful.addNode('test');
		let data = Treeful.getData('test');
		expect(data).toEqual(null);
		Treeful.destroy();
	});

	it('stores passed data into node', () => {
		Treeful.addNode('test', 56);
		let data = Treeful.getData('test');
		expect(data).toEqual(56);
		Treeful.destroy();
	});

	it('throws if data mutation is attempted', () => {
		Treeful.addNode('test', 56);
		expect(() => {
			Treeful.setData('test', 'string');
		}).toThrow();
		Treeful.destroy();
	});

	it('throws if a function is passed as data', () => {
		expect(() => {
			Treeful.addNode('test', () => {
				console.log('');
			});
		}).toThrow();
		Treeful.addNode('test');
		expect(() => {
			Treeful.setData('test', () => {
				console.log('');
			});
		}).toThrow();
		Treeful.destroy();
	});

	it('throws if a node id doesn\'t exist', () => {
		Treeful.addNode('test');
		expect(() => {
			Treeful.getData('node');
		}).toThrow();
		Treeful.destroy();
	});

	it('automatically creates a callback for every node', () => {
		Treeful.addNode('test', 50);
		let callbacks = Treeful.getCallbacks('test').length;
		expect(callbacks).toBe(1);
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
		expect(callbacks).toBe(3);
		Treeful.destroy();
	});

	it('calls callback functions when a node\'s data is changed, and passes data', () => {
		let callbackData = 0;
		let cb = (data) => {
			callbackData = data;
		};
		Treeful.addNode('test');
		Treeful.subscribe('test', cb);
		Treeful.setData('test', 50);
		expect(callbackData).toBe(50);
		Treeful.destroy();
	});

	it('returns an unsubscribe function when you call subscribe', () => {
		var callbackData = 0;
		let cb = (data) => {
			callbackData = data;
		};
		Treeful.addNode('test', 0);
		var unsub = Treeful.subscribe('test', cb);
		unsub();
		Treeful.setData('test', 50);
		let callbacks = Treeful.getCallbacks('test').length;
		expect(callbacks).toBe(1);
		expect(callbackData).toBe(0);
		Treeful.destroy();
	});

	it('unsubscribes only the specified callback function from the node', () => {
		let callbackData1 = 0;
		let callbackData2 = 0;
		let cb1 = (data) => {
			callbackData1 = data;
		};
		let cb2 = (data) => {
			callbackData2 = data;
		};

		Treeful.addNode('test', 0);
		let unsub1 = Treeful.subscribe('test', cb1);
		Treeful.subscribe('test', cb2);
		unsub1();
		Treeful.setData('test', 50);
		expect(Treeful.getCallbacks('test').length).toBe(2);
		expect(callbackData1).toBe(0);
		expect(callbackData2).toBe(50);

		unsub1 = Treeful.subscribe('test', cb1);
		unsub1();
		Treeful.setData('test', 10);
		expect(Treeful.getCallbacks('test').length).toBe(2);
		expect(callbackData1).toBe(0);
		expect(callbackData2).toBe(10);
		Treeful.destroy();
	});

	it('calls callback when a child node is updated', () => {
		var callbackData = 0;
		let cb = (data) => {
			callbackData = data;
		};
		Treeful.addNode('test');
		Treeful.addNode('child', 0, 'test');
		Treeful.subscribe('test', cb);
		Treeful.setData('child', 50);
		expect(callbackData).toBe(50);
		Treeful.destroy();
	});

	it('ignores child callbacks if ignore flag is set', () => {
		var callbackData = 0;
		let cb = (data) => {
			callbackData = data;
		};
		Treeful.addNode('test');
		Treeful.addNode('child', 0, 'test');
		Treeful.subscribe('test', cb, true);
		Treeful.setData('child', 50);
		expect(callbackData).toBe(0);
		Treeful.destroy();
	});

	it('tells you which node was updated when callback is called', () => {
		var callbackData = '';
		let cb = (data, node) => {
			callbackData = node;
		};
		Treeful.addNode('test');
		Treeful.addNode('child', 0, 'test');
		Treeful.subscribe('test', cb);
		Treeful.setData('child', 50);
		expect(callbackData).toBe('child');
		Treeful.destroy();
	});

	it('allows chaining of addNode function', () => {
		expect(() => {
			Treeful.addNode('test').addNode('test2').addNode('test3', null, 'test');
		}).toNotThrow();
		Treeful.destroy();
	});

	it('increments/decrements number when incrementData/decrementData is called', () => {
		Treeful.addNode('test', 0);
		Treeful.incrementData('test');
		expect(Treeful.getData('test'), 1);
		Treeful.incrementData('test', 2);
		expect(Treeful.getData('test'), 3);
		Treeful.decrementData('test');
		expect(Treeful.getData('test'), 2);
		Treeful.decrementData('test', 2);
		expect(Treeful.getData('test'), 0);
		Treeful.destroy();
	});

	it('throws if incrementData/decrementData is called on a node that does not have data type of number', () => {
		Treeful.addNode('test1', 'some string');
		Treeful.addNode('test2');
		expect(() => {
			Treeful.incrementData('test1');
		}).toThrow();
		expect(() => {
			Treeful.decrementData('test1');
		}).toThrow();
		expect(() => {
			Treeful.incrementData('test2');
		}).toThrow();
		Treeful.destroy();
	});

	it('toogles boolean when toggleData is called', () => {
		Treeful.addNode('test', true);
		Treeful.toggleData('test');
		expect(Treeful.getData('test'), false);
		Treeful.toggleData('test');
		expect(Treeful.getData('test'), true);
		Treeful.destroy();
	});

	it('throws if toggleData is called on a node that does not have data type of boolean', () => {
		Treeful.addNode('test', 'some string');
		expect(() => {
			Treeful.toggleData('test');
		}).toThrow();
		Treeful.destroy();
	});
});
