# Treeful
[![npm version][npm-img]][npm-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![monthly downloads][downloads-img]][downloads-url]

It's a(nother) state manager! But let's not get overwhelmed. Treeful will simply do the following 4 things to your app.

1. Single global object that contains all states.
2. Update the states.
3. Subscribe to subset of the states.
4. Run a callback function when the subscribed set is updated.

### Install
```sh
npm install treeful
```

## Why Treeful?

1. **Less code** - One of the strongest merit. Minimal lines of code will be sufficient. No extra files needed.
2. **Tree structure** - Your state can be nested, and subscribing to parent will automatically subscribe to its child nodes.
3. **Efficient data transfer** - We don't pass around whole tree. Only the subscribed set will be passed for efficiency.
4. **Framework independent** - You don't need any wrappers to use it in a framework. Keep your code as is.

### Example

First, import the package and create your tree (you don't need to instantiate)

```js
import Treeful from 'treeful';
Treeful.addNode('count', 0)             //Add node 'count' with value 0 (to 'root').
    .addNode('todos', [], 'root')       //Add node 'todos' to 'root'.
    .addNode('filter', 'all', 'todos'); //Add node 'filter' to 'todos' with value of 'all'.
```

Our tree now looks like this:

![Tree](example/example.png)

Subscribe to node `'todos'` by calling:
```js
Treeful.subscribe('todos', callbackTodos);
//callbackTodos will get called when the data in 'todos' or 'filter' changes
```

Get and set data by calling:
```js
let oldData = Treeful.getData('filter'); //oldData = 'all'
Treeful.setData('filter', 'completed');
//Node 'filter' is updated, and it is a child of 'todos' that is subscribed to callbackTodos.
```

callbackTodos is now called, and passed the new data
```js
function callbackTodos(data, node) {
    //data = 'completed' (updated data)
    //node = 'filter' (node that changed)
    //do some stuff
}
```

To run all examples at http://localhost:3000:

```sh
git clone https://github.com/justinjung04/treeful.git
cd treeful
npm install
npm start
```

The examples will print the tree in console everytime it updates. For source codes, please refer to [example](example).

## Core Methods

### addNode(id, [data, parent])
Add a node to Treeful object.
* `id` (string) - unique string id.
* `data` (anything but function, optional) - data to be stored in the node. It can be in any type except function. Default is `null`.
* `parent` (string, optional) - string id of a parent node. Default is `root`.

**Returns** Treeful object. Allows addNode to be called in a chain.

### getData(id)
Gets data in a node.
* `id` (string) - string id of a node.

**Returns** Data in the node

### setData(id, data)
Sets data in a node.
* `id` (string) - string id of a node.
* `data` (same as existing data type) - data to be set in the node. Data type CANNOT be modified.

### shake(id)
Shakes a node to call all callback functions without changing node data.
* `id` (string) - string id of a node.

### subscribe(id, callback, [ignoreChildren])
Assigns a callback function to a node. The callback function is triggered when the node or its child nodes get updated.
* `id` (string) - string id of a node.
* `callback` (function) - function to be triggered when the node or its child nodes get updated.
* `ignoreChildren` (boolean, optional) - option to ignore children. If set to `true`, updates of child nodes won't trigger the callback function. Default is `false`.

**Returns** Unsubscribe function that removes the assigned callback function from the node.

### destroy()
Resets the tree.

## Helper Methods

### enableDev()
Enables development tool. Currently, the development tool prints the tree in console log whenever setData is called.

### toString([id])
Converts the tree into a string.
* `id` (string, optional) - string id of a node to be printed. Default is `root`.

**Returns** String representation of the tree.

### incrementData(id, [value])
Increments data in a node.
* `id` (string) - string id of a node. The node must contain data type of `number`.
* `value` (number, optional) - value to be incremented by. Default is `1`.

### decrementData(id, [value])
Decrements data in a node.
* `id` (string) - string id of a node. The node must contain data type of `number`.
* `value` (number, optional) - value to be decremented by. Default is `1`.

### toggleData(id)
Toggles data in a node.
* `id` (string) - string id of a node. The node must contain data type of `boolean`.

### pushData(id, data)
Pushes data to last index into an array at a node.
* `id` (string) - string id of a node. The node must contain data type of `array`.
* `data` (anything) - data to be pushed to the array.

### popData(id)
Pops data of last index from an array at a node.
* `id` (string) - string id of a node. The node must contain data type of `array`.

## Contribute
Join the party - please refer to [CONTRIBUTING](CONTRIBUTING.md).

## License
MIT - please refer to [LICENSE](LICENSE).

[npm-url]: https://www.npmjs.org/package/treeful
[npm-img]: https://img.shields.io/npm/v/treeful.svg
[downloads-url]: https://www.npmjs.org/package/treeful
[downloads-img]: https://img.shields.io/npm/dm/treeful.svg
[travis-url]: https://travis-ci.org/jsful/treeful?branch=master
[travis-img]: https://travis-ci.org/jsful/treeful.svg?branch=master
[coveralls-url]: https://coveralls.io/github/jsful/treeful?branch=master
[coveralls-img]: https://coveralls.io/repos/github/jsful/treeful/badge.svg?branch=master