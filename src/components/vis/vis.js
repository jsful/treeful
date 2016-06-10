import React, { Component } from 'react';
import { Treeful, TreefulNode } from '../../treeful/treeful';

import './vis.scss';


export default class Vis extends Component {
	constructor() {
		super(); 
		this.treeful = new Treeful();
		this.treeful.destroy();

		this.currentXPos = window.innerWidth / 2;
		

		this.parentRadius = 40;
		this.currentYPos = this.parentRadius + 5;

		this.childRadius = 30;

		this.parentX = this.currentXPos;
		this.parentY = this.currentYPos;

		this.distanceBetweenNodes = 30;

		this.initialY = this.parentY;
		this.initialX = this.parentX;

		this.parentGenerated = false;
		this.offsetX = 0;

		this.keys = [];


	}

	componentDidMount() {
		this.treeful = new Treeful();
		this.c = this.refs.canvas;
		this.context = this.c.getContext('2d');

		this.drawFirstNode();
		let opt = document.createElement('option');
		opt.innerHTML = 'root';
		this.refs.option.appendChild(opt);

	}

	createChildNode() {

		let id = this.refs.childName.value;
		let parent = this.refs.option.value;

		if(id == "" || parent == "" || this.keys.indexOf(id) > -1) return;

		this.keys.push(id);

		this.refs.childName.value += "_1";

		this.treeful.addNode(id, 20, parent);
		this.visualize();

		let opt = document.createElement('option');
		opt.innerHTML = id;
		this.refs.option.appendChild(opt);
	}



	visualize() {
		this.currentXPos = window.innerWidth / 2;
		this.currentYPos = this.parentRadius + 5;
		this.parentX = this.currentXPos;
		this.parentY = this.currentYPos;

		let tree = this.treeful.getTree();
		console.log(tree);
		
		this.context.clearRect(0,0,this.c.width, this.c.height);
		this.drawFirstNode();
		this.recursiveDraw(tree);

	}



	recursiveDraw(node) {
		let c = Object.keys(node['children']).length;

		//Go down once for direct children
		this.currentYPos += this.childRadius * 2 + this.distanceBetweenNodes;

		this.offsetX = 0;
		
		if(c > 0) {

			// this.offsetX = (c - (c%2==1?1:0)) * (this.childRadius * 2 + this.distanceBetweenNodes) / 2;

			for(let key in node['children']) {
				this.currentXPos;

				this.drawNode(key);

				let c2 = Object.keys(node['children'][key]['children']).length;

				if(c2 > 0) {
					this.parentY = this.currentYPos;
					this.parentX = this.currentXPos;
					this.recursiveDraw(node['children'][key]);	
				} 


				this.currentXPos += (this.childRadius * 2 + this.distanceBetweenNodes) ;	

			}
			
			this.currentYPos -= this.childRadius * 2 + this.distanceBetweenNodes;
			this.currentXPos -= c * (this.childRadius * 2 + this.distanceBetweenNodes);


		} 		

		this.parentY = this.initialY;

		this.parentX = this.initialX;



	}

	drawNode(text) {
		this.context.beginPath();
		this.context.fillStyle = '#677077';
		this.context.arc(this.currentXPos - this.offsetX, this.currentYPos, this.childRadius, 0, 2*Math.PI);
		this.context.fill();

		this.context.font = '15px arial';
		this.context.fillStyle = 'black';
		this.context.fillText(text, ((this.currentXPos - this.offsetX ) - this.childRadius / 2), this.currentYPos);


		this.context.beginPath();
		this.context.moveTo(this.parentX, this.parentY);
		this.context.lineTo((this.currentXPos - this.offsetX), this.currentYPos);
		this.context.stroke();
	}


	drawFirstNode() {
		this.context.beginPath();
		this.context.fillStyle = '#252839';
		this.context.arc(this.currentXPos, this.currentYPos, this.parentRadius, 0, 2*Math.PI);
		this.context.fill();
	}

	render() {
		return (
			<div className='content vis'>
				<div className='controls'>

					<div className='section'>
						<span>Add a child named: </span>
						<input type='text' ref='childName' placeholder='name'/>
						<span>To</span>
						<select ref='option'>
						</select>

						

						<button onClick={this.createChildNode.bind(this)}>Add Child</button>
					</div>
				</div>

				<div className='canvas-container'>

					<canvas width={window.innerWidth} height={window.innerHeight - 100} ref='canvas' >

					</canvas>

				</div>
			</div>
		);
	}
}


