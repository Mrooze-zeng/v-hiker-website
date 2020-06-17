import fontSource from 'Assets/fonts/fredokaone.ttf';
import React, { Component, createRef } from 'react';
import { inject_unount } from 'Utils/decorators';
import Zdog, { Font, Illustration, TextGroup } from 'zdog';
import Zfont from 'zfont';

export default
@inject_unount
class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			t: 0,
			tStep: 5,
			amplitude: 0.75,
			frequency: 80
		};
		this.canvas = createRef();
		this.start = this.start.bind(this);
	}
	componentDidMount() {
		this.initDog();
		this.start();
	}
	initDog() {
		Zfont.init(Zdog);
		this.illo = new Illustration({
			element: this.canvas.current,
			// dragRotate: true,
			rotate: { x: 0.3, y: 0.64, z: 0 },
			resize: 'fullscreen',
			onResize: function(width, height) {
				var minSize = Math.min(width, height);
				this.zoom = minSize / 420;
			}
		});
		this.font = new Font({
			src: fontSource
		});
		this.sub = new TextGroup({
			addTo: this.illo,
			font: this.font,
			value: ['Welcome to', 'V-hiker.cn'],
			fontSize: 60,
			stroke: 2,
			textAlign: 'center',
			textBaseline: 'middle',
			color: '#fff',
			fill: true
		});
	}
	wave(group) {
		const { t, amplitude, frequency } = this.state;
		group.children.forEach(shape => {
			var x = shape.translate.x + t;
			shape.translate.y += amplitude * Math.sin(x / frequency);
		});
	}
	start() {
		const { t, tStep } = this.state;
		this.wave(this.sub);
		this.setState({
			t: t + tStep
		});
		this.illo.updateRenderGraph();
		requestAnimationFrame(this.start.bind(this));
	}
	render() {
		return (
			<canvas
				width="240"
				height="240"
				ref={this.canvas}
				style={{ width: '100%', height: '100%' }}
			>
				Hello world!!
			</canvas>
		);
	}
}
