var THREEx	= THREEx	|| {}

THREEx.LeftOrbs	= function(baseColor){
	// handle default arguments values
	baseColor	= baseColor	|| new THREE.Color('cyan')
	// rendering loop
	var onRenderFcts= []
	this.update	= function(delta, now){
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(delta, now)
		})
	}
	
	// container
	var object3d	= new THREE.Object3D
	this.object3d	= object3d
	//////////////////////////////////////////////////////////////////////////////////
	//		geometric glow							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= THREEx.createAtmosphereMaterial()
	material.uniforms.glowColor.value.set(baseColor)
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 2.0
	var outterGlow	= new THREE.Mesh(geometry, material );
	outterGlow.scale.multiplyScalar(1.01);
	object3d.add( outterGlow );
	// new THREEx.addAtmosphereMaterial2DatGui(material)		

	var geometry	= new THREE.SphereGeometry(0.4, 32, 32)
	var material	= THREEx.createAtmosphereMaterial()
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(baseColor)
	material.uniforms.coeficient.value	= 0.39
	material.uniforms.power.value		= 5.0
	var innerGlow	= new THREE.Mesh(geometry, material );
	object3d.add( innerGlow );
	// new THREEx.addAtmosphereMaterial2DatGui(material)

	

	//////////////////////////////////////////////////////////////////////////////////
	//		inner sphere							//
	//////////////////////////////////////////////////////////////////////////////////
	
	// var geometry	= new THREE.SphereGeometry(0.4, 32, 32);
	// var material	= new THREE.MeshBasicMaterial({
	// 	color		: baseColor,
	// 	opacity		: 0.9,
	// 	transparent	: true,
	// });
	// var insideMesh	= new THREE.Mesh( geometry, material );
	// object3d.add( insideMesh );

	//////////////////////////////////////////////////////////////////////////////////
	//		outter sphere							//
	//////////////////////////////////////////////////////////////////////////////////
	
	var geometry	= new THREE.SphereGeometry( 0.5, 32, 32);
	var material	= new THREE.MeshPhongMaterial({
		envMap		: THREEx.createTextureCube('pisa'),
		reflectivity	: 2,
		color		: baseColor,
		transparent	: true,
		opacity		: 0.2,
	});
	var outterMesh	= new THREE.Mesh( geometry, material );
	this.outterMesh	= outterMesh
	object3d.add( outterMesh );

	//////////////////////////////////////////////////////////////////////////////////
	//		pointlight in orbs						//
	//////////////////////////////////////////////////////////////////////////////////
	
	// var light	= new THREE.PointLight( baseColor, 3, 5);
	// this.light	= light
	// object3d.add( light )
	
	//////////////////////////////////////////////////////////////////////////////////
	//		animate glowing intensity with perlin				//
	//////////////////////////////////////////////////////////////////////////////////
	
	var perlin 	= new ImprovedNoise();
	var seed	= Math.random()*1000;
	onRenderFcts.push(function(delta, now){		
		var intensity	= perlin.noise(seed,0,0)+0.5
		seed		+= delta*1	// 1.0 is speed
		
		innerGlow.scale.set(1,1,1).multiplyScalar(1 + intensity*0.2)

		// insideMesh.scale.set(1,1,1).multiplyScalar(0.8 + intensity*0.2)
		// insideMesh.material.opacity	= 0.1 + intensity*0.2

		// light.intensity			= 1.0 + intensity*3
	})		
	
}