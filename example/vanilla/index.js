import Treeful from '../../src/treeful';

Treeful.addNode('data0', 0);
Treeful.addNode('data1', {name: 'Justin', age: {isOld: false}});
Treeful.addNode('data2', ['hi', 'hello', 'there']);
Treeful.addNode('data3', 'some string');
Treeful.addNode('data4', true, 'data3');
Treeful.addNode('data5', 5, 'data3');
Treeful.addNode('data6', 6, 'data2');
Treeful.subscribe('data0', counterChanged);

var inc = document.getElementById('inc');
var dec = document.getElementById('dec');

inc.onclick = function() {
	Treeful.setData('data0', Treeful.getData('data0') + 1);
}

dec.onclick = function() {
	Treeful.setData('data0', Treeful.getData('data0') - 1);
}

function counterChanged(data) {
	document.getElementById('count').innerHTML = data;
}

Treeful.print('data3');
Treeful.print('root');