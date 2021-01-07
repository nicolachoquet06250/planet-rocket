AFRAME.registerComponent('earth', {
	init() {
		this.el.setAttribute('geometry', {
			primitive: 'sphere',
			radius: 500
		});
		this.el.setAttribute('material', {
			color: 'green'
		});
		this.el.setAttribute('static-body', '');
	}
});

AFRAME.registerPrimitive('a-earth', {
	defaultComponents: {
		earth: {}
	},
	mappings: {}
});
