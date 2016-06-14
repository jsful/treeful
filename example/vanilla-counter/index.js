import Treeful from '../../src/treeful-dev';

Treeful.addNode('count', 0);
Treeful.addNode('node1', [ 0, 0, 0, 'string', {hello: 'world'} ]);
Treeful.addNode('node2', {hi: 'there'});
Treeful.addNode('node3', true);
Treeful.addNode('node4', 1, 'node1');
Treeful.addNode('node5', {tire: 'flat', box: 'square', nested: {nested: true}});
Treeful.addNode('node6', 0);
Treeful.subscribe('count', counterChanged);
Treeful.print();

var inc = document.getElementById('inc');
var dec = document.getElementById('dec');

inc.onclick = function() {
	Treeful.setData('count', Treeful.getData('count') + 1);
}

dec.onclick = function() {
	Treeful.setData('count', Treeful.getData('count') - 1);
}

function counterChanged(data) {
	document.getElementById('count').innerHTML = data;
	Treeful.print();
}