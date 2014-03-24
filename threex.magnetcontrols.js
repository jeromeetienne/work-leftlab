var THREEx	= THREEx	|| {}

THREEx.MagnetControls	= function(object3d){
	// rendering loop
	var onRenderFcts= []
	this.update	= function(delta, othersObject3D){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, othersObject3D)
		})
	}
	
	// export object3d
	this.object3d	= object3d

	// physics constant
	var velocity	= new THREE.Vector3()
	this.velocity	= velocity
	var acceleration= new THREE.Vector3()
	this.acceleration=acceleration
	var damping	= new THREE.Vector3().set(1,1,1).multiplyScalar(0.9)
	this.damping	= damping

	onRenderFcts.push(function(delta, othersObject3D){
		othersObject3D.push(function(otherObject3D){
			// handle only half of the object
			if( Math.random() > 0.5 )	return;

			var distance	= object3d.distanceTo(otherObject3D)
			// compute force intensity
			var intensity	= 0
			if( intensity === 0 )	return;
			// compute force vector
			var force	= object3d.position.clone()
						.sub(otherObject3D.position)
						.multiplyScalar(intensity)
			// apply the force to acceleration
			acceleration.add(force)
		})
	})
	
	onRenderFcts.push(function(delta){
		// handle physics
		velocity.add(acceleration)
		acceleration.set(0,0,0)
		velocity.multiply(damping)
		// update object3d position
		object3d.position.add(velocity)
	})
	
}