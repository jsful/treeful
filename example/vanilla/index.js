import Treeful from '../../src/treeful';

Treeful.addNode('counter', 0);
Treeful.subscribe('counter', counterChanged);

var inc = document.getElementById('inc');
var dec = document.getElementById('dec');

inc.onclick = function() {
	Treeful.setData('counter', Treeful.getData('counter') + 1);
}

dec.onclick = function() {
	Treeful.setData('counter', Treeful.getData('counter') - 1);
}

function counterChanged(data) {
	document.getElementById('count').innerHTML = data;
}