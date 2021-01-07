AFRAME.registerComponent('start-button', {
	schema: {
		value: {
			type: 'string'
		},
		textColor: {
			type: 'color',
			default: 'white'
		},
		colo: {
			type: 'color',
			default: 'white'
		},
		opacity: {
			type: 'number',
			default: 1
		}
	},
	init() {
		this.el.classList.add('button');
		this.el.setAttribute('geometry', 'primitive: box; width: 0.5; height: 0.2; depth: 0.02');
		this.el.setAttribute('scale', '0.3 0.3 0.3');
		this.el.setAttribute('material', `color: ${this.data.color}; opacity: ${this.data.opacity}`);

		this.el.innerHTML = `<a-text value="${this.data.value}" color="${this.data.textColor}" position="-0.117 0 0.15" scale="0.2 0.2 0.2"></a-text>`;
	}
});

AFRAME.registerPrimitive('start-button', {
	defaultComponents: {
		'start-button': {},
		'start-sequence-decolage': {}
	},
	mappings: {
		el: 'start-sequence-decolage.el',
		decompte: 'start-sequence-decolage.decompte',
		value: 'start-button.value',
		color: 'start-button.color',
		opacity: 'start-button.opacity',
		'text-color': 'start-button.textColor'
	}
});
AFRAME.registerComponent('start-sequence-decolage', {
	schema: {
		el: {
			type: 'selector'
		},
		decompte: {
			type: 'number',
			default: 5
		}
	},
	init() {
		this.el.addEventListener('click', e => {
			this.el.remove();
			this.data.el.setAttribute('sequence-decolage', `initialDecompte: ${this.data.decompte}`);
		})
	}
});
