
let THREE = require('three');
let OrbitControls = require('three/examples/jsm/controls/OrbitControls');
let GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader');
let  SkeletonUtils = require('three/examples/jsm/utils/SkeletonUtils');

let soldierjs = {
    initsoldier(){

        initScene();
        initRenderer();
        loadModels();
        animate();
    },
    demo2(){
        console.log("OrbitControls;", OrbitControls)
        // 创建场景对象Scene
        var scene = new THREE.Scene();
    
        var geometry = new THREE.BoxGeometry(100, 100, 100); // 创建一个立方几何体对象
        var material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // 材质对象Material
        var mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
        scene.add(mesh); // 网格模型添加到场景中
    
        /* 
        * 光源设置
        */
    
        // 点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
    
        /**
         * 相机设置
         */
        var width = window.innerWidth/3; //窗口宽度
        var height = window.innerHeight/2; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        var div = document.getElementById('info');
        div.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        renderer.render(scene, camera);
        var controls = new OrbitControls.OrbitControls(camera,renderer.domElement);//创建控件对象
        controls.addEventListener('change', ()=>{renderer.render(scene, camera)});//监听鼠标、键盘事件
    
    
        // -------------------渲染场景---需要使用渲染循环、动画循环------------------------------------
        var animate = () =>{
          requestAnimationFrame(animate);
          // =====================旋转起来
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.01;
          // =====================旋转起来
          renderer.render(scene, camera);
        }
        // animate();
    
    
    
    },
    demo1(){
        // 单个的人物运动！
        let Stats = require('three/examples/jsm/libs/stats.module');
        
        let GUI = require('three/examples/jsm/libs/dat.gui.module');
        let GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader');
        var scene, renderer, camera, stats;
        var model, skeleton, mixer, clock;

        var crossFadeControls = [];

        var idleAction, walkAction, runAction;
        var idleWeight, walkWeight, runWeight;
        var actions, settings;

        var singleStepMode = false;
        var sizeOfNextStep = 0;

        var scene, renderer, camera, stats;
        var model, skeleton, mixer, clock;

        var crossFadeControls = [];

        var idleAction, walkAction, runAction;
        var idleWeight, walkWeight, runWeight;
        var actions, settings;

        var singleStepMode = false;
        var sizeOfNextStep = 0;
        demo1_init();
        // demo1_init
        function demo1_init(){
            var container = document.getElementById( 'demo1' );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 1, 2, - 3 );
            camera.lookAt( 0, 1, 0 );

            clock = new THREE.Clock();

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xa0a0a0 );
            scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

            var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            hemiLight.position.set( 0, 20, 0 );
            scene.add( hemiLight );

            var dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( - 3, 10, - 10 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 2;
            dirLight.shadow.camera.bottom = - 2;
            dirLight.shadow.camera.left = - 2;
            dirLight.shadow.camera.right = 2;
            dirLight.shadow.camera.near = 0.1;
            dirLight.shadow.camera.far = 40;
            scene.add( dirLight );

            // scene.add( new CameraHelper( light.shadow.camera ) );

            // ground

            var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add( mesh );

            var loader = new GLTFLoader.GLTFLoader();
            
            loader.load( 'assets/eimdoard/3d/models/gltf/Soldier.glb', function ( gltf ) {

                model = gltf.scene;
                scene.add( model );

                model.traverse( function ( object ) {

                    if ( object.isMesh ) object.castShadow = true;

                } );

                //

                skeleton = new THREE.SkeletonHelper( model );
                skeleton.visible = false;
                scene.add( skeleton );

                //

                // createPanel();


                //

                var animations = gltf.animations;

                mixer = new THREE.AnimationMixer( model );

                idleAction = mixer.clipAction( animations[ 0 ] );
                walkAction = mixer.clipAction( animations[ 3 ] );
                runAction = mixer.clipAction( animations[ 1 ] );

                actions = [ idleAction, walkAction, runAction ];

                activateAllActions();

                animate();

            } );

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( 400, 300 );
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );

            // stats = new Stats();
            // container.appendChild( stats.dom );

            window.addEventListener( 'resize', onWindowResize, false );
        }





        function activateAllActions() {


            actions.forEach( function ( action ) {

                action.play();

            } );

        }





        // Called by the render loop

        function updateCrossFadeControls() {

            crossFadeControls.forEach( function ( control ) {

                control.setDisabled();

            } );

            if ( idleWeight === 1 && walkWeight === 0 && runWeight === 0 ) {

                crossFadeControls[ 1 ].setEnabled();

            }

            if ( idleWeight === 0 && walkWeight === 1 && runWeight === 0 ) {

                crossFadeControls[ 0 ].setEnabled();
                crossFadeControls[ 2 ].setEnabled();

            }

            if ( idleWeight === 0 && walkWeight === 0 && runWeight === 1 ) {

                crossFadeControls[ 3 ].setEnabled();

            }

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth,  window.innerHeight );

        }

        function animate() {

            // Render loop

            requestAnimationFrame( animate );

            // idleWeight = idleAction.getEffectiveWeight();
            // walkWeight = walkAction.getEffectiveWeight();
            // runWeight = runAction.getEffectiveWeight();

            // 这里是修改运动状态！
            idleWeight = idleAction.setEffectiveWeight(0);
            walkWeight = walkAction.setEffectiveWeight(0);
            runWeight = runAction.setEffectiveWeight(1);
            
          
            console.log("idleWeight---", idleWeight)
            console.log("walkWeight---", walkWeight)
            console.log("runWeight---", runWeight)

     

            // Enable/disable crossfade controls according to current weight values

            updateCrossFadeControls();

            // Get the time elapsed since the last frame, used for mixer update (if not in single step mode)

            var mixerUpdateDelta = clock.getDelta();

            // If in single step mode, make one step and then do nothing (until the user clicks again)

            if ( singleStepMode ) {

                mixerUpdateDelta = sizeOfNextStep;
                sizeOfNextStep = 0;

            }

            // Update the animation mixer, the stats panel, and render this frame

            mixer.update( mixerUpdateDelta );

            // stats.update();

            renderer.render( scene, camera );

        }

            

    }
}




//////////////////////////////
// Global objects
//////////////////////////////
var worldScene = null; // THREE.Scene where it all will be rendered
var renderer = null;
var camera = null;
var clock = null;
var mixers = []; // All the THREE.AnimationMixer objects for all the animations in the scene
//////////////////////////////

//////////////////////////////
// Information about our 3D models and units
//////////////////////////////

// The names of the 3D models to load. One-per file.
// A model may have multiple SkinnedMesh objects as well as several rigs (armatures). Units will define which
// meshes, armatures and animations to use. We will load the whole scene for each object and clone it for each unit.
// Models are from https://www.mixamo.com/
var MODELS = [
    { name: "Soldier" },
    { name: "Parrot" },
    // { name: "RiflePunch" },
];

// Here we define instances of the models that we want to place in the scene, their position, scale and the animations
// that must be played.
var UNITS = [
    {
        modelName: "Soldier", // Will use the 3D model from file models/gltf/Soldier.glb
        meshName: "vanguard_Mesh", // Name of the main mesh to animate
        position: { x: 0, y: 0, z: 0 }, // Where to put the unit in the scene
        scale: 1, // Scaling of the unit. 1.0 means: use original size, 0.1 means "10 times smaller", etc.
        animationName: "Idle" // Name of animation to run
    },
    {
        modelName: "Soldier",
        meshName: "vanguard_Mesh",
        position: { x: 3, y: 0, z: 0 },
        scale: 2,
        animationName: "Walk"
    },
    {
        modelName: "Soldier",
        meshName: "vanguard_Mesh",
        position: { x: 1, y: 0, z: 0 },
        scale: 1,
        animationName: "Run"
    },
    {
        modelName: "Parrot",
        meshName: "mesh_0",
        position: { x: - 4, y: 0, z: 0 },
        rotation: { x: 0, y: Math.PI, z: 0 },
        scale: 0.01,
        animationName: "parrot_A_"
    },
    {
        modelName: "Parrot",
        meshName: "mesh_0",
        position: { x: - 2, y: 0, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        scale: 0.02,
        animationName: null
    },
];

//////////////////////////////
// The main setup happens here
//////////////////////////////
var numLoadedModels = 0;
// initScene();
// initRenderer();
// loadModels();
// animate();




//////////////////////////////

//////////////////////////////
// Function implementations
//////////////////////////////
/**
 * Function that starts loading process for the next model in the queue. The loading process is
 * asynchronous: it happens "in the background". Therefore we don't load all the models at once. We load one,
 * wait until it is done, then load the next one. When all models are loaded, we call loadUnits().
 */

function loadModels() {

    for ( var i = 0; i < MODELS.length; ++ i ) {

        var m = MODELS[ i ];

        loadGltfModel( m, function () {

            ++ numLoadedModels;

            if ( numLoadedModels === MODELS.length ) {

                console.log( "All models loaded, time to instantiate units..." );
                instantiateUnits();

            }

        } );

    }

}



/**
 * Look at UNITS configuration, clone necessary 3D model scenes, place the armatures and meshes in the scene and
 * launch necessary animations
 */
function instantiateUnits() {

    var numSuccess = 0;

    for ( var i = 0; i < UNITS.length; ++ i ) {

        var u = UNITS[ i ];
        var model = getModelByName( u.modelName );

        if ( model ) {

            var clonedScene = SkeletonUtils.SkeletonUtils.clone( model.scene );

            if ( clonedScene ) {

                // THREE.Scene is cloned properly, let's find one mesh and launch animation for it
                var clonedMesh = clonedScene.getObjectByName( u.meshName );

                if ( clonedMesh ) {

                    var mixer = startAnimation( clonedMesh, model.animations, u.animationName );

                    // Save the animation mixer in the list, will need it in the animation loop
                    mixers.push( mixer );
                    numSuccess ++;

                }

                // Different models can have different configurations of armatures and meshes. Therefore,
                // We can't set position, scale or rotation to individual mesh objects. Instead we set
                // it to the whole cloned scene and then add the whole scene to the game world
                // Note: this may have weird effects if you have lights or other items in the GLTF file's scene!
                worldScene.add( clonedScene );

                if ( u.position ) {

                    clonedScene.position.set( u.position.x, u.position.y, u.position.z );

                }

                if ( u.scale ) {

                    clonedScene.scale.set( u.scale, u.scale, u.scale );

                }

                if ( u.rotation ) {

                    clonedScene.rotation.x = u.rotation.x;
                    clonedScene.rotation.y = u.rotation.y;
                    clonedScene.rotation.z = u.rotation.z;

                }

                }

        } else {

            console.error( "Can not find model", u.modelName );

        }

    }

    console.log( `Successfully instantiated ${numSuccess} units` );

}

/**
 * Start animation for a specific mesh object. Find the animation by name in the 3D model's animation array
 * @param skinnedMesh {THREE.SkinnedMesh} The mesh to animate
 * @param animations {Array} Array containing all the animations for this model
 * @param animationName {string} Name of the animation to launch
 * @return {THREE.AnimationMixer} Mixer to be used in the render loop
 */
function startAnimation( skinnedMesh, animations, animationName ) {

    var mixer = new THREE.AnimationMixer( skinnedMesh );
    var clip = THREE.AnimationClip.findByName( animations, animationName );

    if ( clip ) {

        var action = mixer.clipAction( clip );
        action.play();

    }

    return mixer;

}


/**
 * Find a model object by name
 * @param name
 * @returns {object|null}
 */
function getModelByName( name ) {

    for ( var i = 0; i < MODELS.length; ++ i ) {

        if ( MODELS[ i ].name === name ) {

            return MODELS[ i ];

        }

    }

    return null;

}

/**
 * Load a 3D model from a GLTF file. Use the GLTFLoader.
 * @param model {object} Model config, one item from the MODELS array. It will be updated inside the function!
 * @param onLoaded {function} A callback function that will be called when the model is loaded
 */
function loadGltfModel( model, onLoaded ) {

    // assets/eimdoard/3d/models/gltf/Soldier.glb
    var loader = new GLTFLoader.GLTFLoader();
    var modelName = "assets/eimdoard/3d/models/gltf/" + model.name + ".glb";

    loader.load( modelName, function ( gltf ) {

        var scene = gltf.scene;

        model.animations = gltf.animations;
        model.scene = scene;

        // Enable Shadows

        gltf.scene.traverse( function ( object ) {

            if ( object.isMesh ) {

                object.castShadow = true;

            }

        } );

        console.log( "Done loading model", model.name );

        onLoaded();

    } );

}

/**
 * Render loop. Renders the next frame of all animations
 */
function animate() {

    requestAnimationFrame( animate );

    // Get the time elapsed since the last frame

    var mixerUpdateDelta = clock.getDelta();

    // Update all the animation frames

    for ( var i = 0; i < mixers.length; ++ i ) {

        mixers[ i ].update( mixerUpdateDelta );

    }

    renderer.render( worldScene, camera );

}

//////////////////////////////
// General Three.JS stuff
//////////////////////////////
// This part is not anyhow related to the cloning of models, it's just setting up the scene.

/**
 * Initialize ThreeJS scene renderer
 */
function initRenderer() {

    var container = document.getElementById( 'container' );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth/3, window.innerHeight/2 );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild( renderer.domElement );

}

/**
 * Initialize ThreeJS THREE.Scene
 */
function initScene() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 3, 6, - 10 );
    camera.lookAt( 0, 1, 0 );

    clock = new THREE.Clock();

    worldScene = new THREE.Scene();
    worldScene.background = new THREE.Color( 0xa0a0a0 );
    worldScene.fog = new THREE.Fog( 0xa0a0a0, 10, 22 );

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 );
    worldScene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( - 3, 10, - 10 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = - 10;
    dirLight.shadow.camera.left = - 10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    worldScene.add( dirLight );

    // ground
    var groundMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( {
            color: 0x999999,
            depthWrite: false
        } )
    );

    groundMesh.rotation.x = - Math.PI / 2;
    groundMesh.receiveShadow = true;
    worldScene.add( groundMesh );
    window.addEventListener( 'resize', onWindowResize, false );

}

/**
 * A callback that will be called whenever the browser window is resized.
 */
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}




// 2、导出这个模块
module.exports = soldierjs;

