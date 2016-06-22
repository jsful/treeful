import Treeful from '../../src/treeful-dev';

Treeful.addNode('count', 0);
let unsubscribe;

const onClickInc = () => {
	Treeful.setData('count', Treeful.getData('count') + 1);
	// Or you may use a helper function
	// Treeful.incrementData('count');
};

const onClickDec = () => {
	Treeful.setData('count', Treeful.getData('count') - 1);
	// Or you may use a helper function
	// Treeful.decrementData('count');
};

const counterUpdated = (data) => {
	document.getElementById('count').innerHTML = data;
};

window.onload = () => {
	document.getElementById('inc').onclick = onClickInc;
	document.getElementById('dec').onclick = onClickDec;
	unsubscribe = Treeful.subscribe('count', counterUpdated);
};

window.onunload = () => {
	unsubscribe();
};