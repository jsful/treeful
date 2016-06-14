import Treeful from '../../src/treeful-dev';

Treeful.addNode('count', 0);
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