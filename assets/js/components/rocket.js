AFRAME.registerComponent('rocket', {
	init() {
		const build_body = () => `<a-cylinder radius="1" height="10" color="red" position="2 381.5 0" static-body></a-cylinder>`;
		const build_nose = () => `<a-cone radius-top="0" radius-bottom="1" height="3" color="red" position="2 388 0" static-body></a-cone>`;
		const build_reactor = (x, z) => `
        		<a-cylinder class="reactor" radius="0.5" height="4" color="red" position="${x} 377 ${z}" static-body>
                    <a-sphere radius="0.5" color="red" position="0 2 0" static-body></a-sphere>
                    <a-cone radius-top="0" radius-bottom="1" height="1" color="red" position="0 -2 0"></a-cone>
                </a-cylinder>
        		`;

		this.el.innerHTML = `${build_body()}
        		${build_nose()}
        		${build_reactor(2, 1.5)}
        		${build_reactor(2, -1.5)}
        		${build_reactor(3.5, 0)}
        		${build_reactor(0.5, 0)}`;
	}
});

AFRAME.registerComponent('sequence-decolage', {
	schema: {
		initialDecompte: {
			type: 'number',
			default: 5
		}
	},

	decolage(rocket) {
		if (rocket) {
			rocket.setAttribute('start-reactors', 'intensity: started');
			setTimeout(() => {
				rocket.setAttribute('start-reactors', 'intensity: lite');
				rocket.setAttribute('velocity', '0 0.5 0');
			}, 2000);
			setTimeout(() => {
				rocket.setAttribute('start-reactors', 'intensity: middle');
				rocket.setAttribute('velocity', '0 10 0');
			}, 4000);
			setTimeout(() => {
				rocket.setAttribute('start-reactors', 'intensity: fort');
				rocket.setAttribute('velocity', '0 20 0');
			}, 6000);
			setTimeout(() => {
				rocket.setAttribute('velocity', '0 40 0');
			}, 7000);
		}
	},

	init() {
		if (this.data.initialDecompte === 0) {
			return;
		}
		this.start_decompte();
	},

	start_decompte() {
		let decompte;
		if (document.querySelector('[camera] a-text') === null) {
			decompte = document.createElement('a-text');
			decompte.setAttribute('value', this.data.initialDecompte);
			decompte.setAttribute('position', '0 0 -0.5')
			document.querySelector('[camera]').appendChild(decompte);
		} else {
			decompte = document.querySelector('[camera] a-text');
		}

		const interval = setInterval(() => {
			if (decompte.getAttribute('value') !== '0') {
				const nextValue = parseInt(decompte.getAttribute('value')) - 1;
				decompte.setAttribute('value', nextValue.toString());
			} else {
				decompte.remove();
				this.decolage(this.el);
				clearInterval(interval);
			}
		}, 1000);
	},

	on_initialDecompte_changed(old_d, new_d) {
		if (new_d !== 0) {
			this.start_decompte();
		}
	},

	update(old) {
		if (JSON.stringify(old) !== '{}') {
			for (let key of Object.keys(old)) {
				if (old[key] !== this.data[key] && `on_${key}_changed` in this) {
					this[`on_${key}_changed`](old[key], this.data[key]);
				}
			}
		}
		// console.log(old);
	}
});

AFRAME.registerComponent('start-reactors', {
	schema: {
		intensity: {
			type: 'string',
			default: 'off'
		}
	},
	init() {
		const reactors = Array.from(this.el.querySelectorAll('.reactor'));
		if (this.data.intensity === 'off') {
			for (let reactor of reactors) {
				this.stop_reactor(reactor);
			}
		} else {
			for (let reactor of reactors) {
				this.start_reactor(reactor, this.data.intensity);
			}
		}
	},

	start_reactor(reactor, intensity) {
		let radius;
		let base_height;
		let position = '0 -2.5 0';
		switch (intensity) {
			case 'started':
				radius = 1;
				base_height = 0.5;
				position = '0 -2 0';
				break;
			case 'lite':
				radius = 1;
				base_height = 0.5;
				break;
			case 'middle':
				radius = 1.3;
				base_height = 0.7;
				break;
			case 'fort':
				radius = 1.6;
				base_height = 1;
				break;
			default:
				radius = 1;
				base_height = 0.5;
				break;
		}

		if (reactor.querySelector('.fire')) {
			reactor.querySelector('.fire').remove();
		}

		// create fire
		const fire = document.createElement('a-entity');
		fire.classList.add('fire');
		fire.setAttribute('position', position);

		const fire_p1 = document.createElement('a-cylinder');
		fire_p1.setAttribute('radius', radius.toString());
		fire_p1.setAttribute('height', base_height.toString());
		fire_p1.setAttribute('position', `0 -${base_height / 2} 0`)
		fire_p1.setAttribute('color', 'orange');
		fire.appendChild(fire_p1);

		const fire_p2 = document.createElement('a-cylinder');
		fire_p2.setAttribute('radius', (radius - 0.2).toString());
		fire_p2.setAttribute('height', (base_height * 2).toString());
		fire_p2.setAttribute('position', `0 -${base_height} 0`)
		fire_p2.setAttribute('color', 'orange');
		fire.appendChild(fire_p2);

		const fire_p3 = document.createElement('a-cylinder');
		fire_p3.setAttribute('radius', (radius - 0.2 - 0.2).toString());
		fire_p3.setAttribute('height', (base_height * 3).toString());
		fire_p3.setAttribute('position', `0 -${(base_height * 3) / 2} 0`)
		fire_p3.setAttribute('color', 'orange');
		fire.appendChild(fire_p3);

		reactor.appendChild(fire);
		console.log(fire);
	},

	stop_reactor(reactor) {
		if (reactor && reactor.querySelector('.fire')) {
			reactor.querySelector('.fire').remove();
		}
	},

	on_intensity_changed(old_d, new_d) {
		const reactors = Array.from(this.el.querySelectorAll('.reactor'));
		console.log(new_d)
		if (new_d === 'off') {
			for (let reactor of reactors) {
				this.stop_reactor(reactor);
			}
		} else {
			for (let reactor of reactors) {
				this.start_reactor(reactor, new_d);
			}
		}
	},

	update(old) {
		if (JSON.stringify(old) !== '{}') {
			for (let key of Object.keys(old)) {
				if (old[key] !== this.data[key] && `on_${key}_changed` in this) {
					this[`on_${key}_changed`](old[key], this.data[key]);
				}
			}
		}
		// console.log(old);
	}
});

AFRAME.registerPrimitive('a-rocket', {
	defaultComponents: {
		rocket: {},
		'sequence-decolage': {
			initialDecompte: 0
		},
		'start-reactors': {
			intensity: 'off'
		}
	},
	mappings: {}
});
