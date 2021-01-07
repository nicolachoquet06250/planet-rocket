AFRAME.registerComponent('user', {
	init() {
		const rig = this.el;// document.createElement('a-entity');
		rig.setAttribute('id', 'rig');
		rig.setAttribute('movement-controls', 'constrainToNavMesh: true');
		rig.setAttribute('keyboard-controls', '');
		rig.setAttribute('kinematic-body', 'radius: 0.4; height: 1.7');

		const camera = document.createElement('a-entity');
		camera.setAttribute('id', 'camera');
		camera.setAttribute('camera', 'userHeight: 1.7');
		camera.setAttribute('loop-controls', '');
		rig.appendChild(camera);

		const mouseCursor = document.createElement('a-entity');
		mouseCursor.setAttribute('cursor', 'rayOrigin: mouse');
		mouseCursor.setAttribute('raycaster', 'far: 2; objects: ');
		rig.appendChild(mouseCursor);

		const leftHand = document.createElement('a-entity');
		leftHand.setAttribute('id', 'left-hand');
		leftHand.setAttribute('position', '-0.25 0.6 0');
		leftHand.setAttribute('hand-controls', 'hand: left; handModelStyle: lowPoly; color: #ffcccc');
		leftHand.setAttribute('hand-tracking-controls', 'hand: left; modelColor: #ffcccc; modelStyle: lowPoly');
		leftHand.setAttribute('sphere-collider', 'objects: .ground, .celling');
		leftHand.setAttribute('super-hand', '');
		leftHand.setAttribute('cursor', '');
		leftHand.setAttribute('raycaster', 'far: 2; objects: ');
		leftHand.setAttribute('teleport-controls', 'cameraRig: #rig; teleportOrigin: #camera; button: grip; type: parabolic');
		rig.appendChild(leftHand);

		const rightHand = document.createElement('a-entity');
		rightHand.setAttribute('id', 'right-hand');
		rightHand.setAttribute('position', '0.25 0.6 0');
		rightHand.setAttribute('hand-controls', 'hand: right; handModelStyle: lowPoly; color: #ffcccc');
		rightHand.setAttribute('hand-tracking-controls', 'hand: right; modelColor: #ffcccc; modelStyle: lowPoly');
		rightHand.setAttribute('sphere-collider', 'objects: a-door, a-box');
		rightHand.setAttribute('super-hand', '');
		rightHand.setAttribute('cursor', '');
		rightHand.setAttribute('raycaster', 'far: 2; objects: ');
		rig.appendChild(rightHand);
	}
});
