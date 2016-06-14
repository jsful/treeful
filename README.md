# Treeful

### Simplify your questions!
Let's not get overwhelmed. Treeful will simply do the following 4 things to your app.

1. Single global object that contains all states
2. Update the states
3. Subscribe to subset of the states
4. Run a callback function when the subscribed set is updated

### Install
```sh
npm install treeful
```

## Methods

### addNode(id, [data, parent])
Add a node(state) to Treeful object.
* `id` (string) - unique string id
* `data` (anything except function, optional) - data stored in the node. It can be in any type except function. Default is `null`.
* `parent` (string) - string id of a parent node. Default is `root`.

**Returns** Treeful object. Allows addNode to be called in a chain.

### setData(id, data)
Sets(updates) data in a node.
* `id` (string) - string id of a node
* `data` (anything except function, optional) - data to be set(updated) in the node. Data type CANNOT be modified.

### getData(id)
Gets(reads) data in a node.
* `id` (string) - string id of a node

**Returns** Data of the node

### subscribe(id, callback, [ignoreChildren])
Assigns a callback function to a node. The callback function is triggered when the node or its child nodes get updated.
* `id` (string) - string id of a node
* `callback` (function) - function to be triggered when the node or its child nodes get updated.
* `ignoreChildren` (boolean, optional) - option to ignore children. If set to `true`, updates of child nodes won't trigger the callback function. Default is `false`.

**Returns** Unsubscribe function that removes the assigned callback function from the node.

### destroy()
Resets the tree.

## License
MIT - please refer to [LICENSE](LICENSE).