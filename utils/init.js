/**主要作用初始化three.js的基础环境**/ 
// 1.初始化场景

// 引入three.js
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入将原生dom转化为3d并渲染到3d场景中
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'

// 声明全局变量
export let scene, camera, renderer,controls,css3DRenderer

// 初始化场景
(function init(){
    // 创建场景
    scene = new THREE.Scene()
    // 创建摄像机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    
    // 初始化摄像机位置
    camera.position.z = 0.1

    // 创建渲染器(画布)
    renderer = new THREE.WebGLRenderer({
        // 开启抗锯齿
    antialias: true,
    })
    // 设置画布大小
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 将渲染器添加到DOM 
    document.body.appendChild(renderer.domElement)
})();



// 创建轨道控制器
(function initControls(){
    // 创建
    controls = new OrbitControls(camera, renderer.domElement)

    // 设置轨道控制器垂直方向旋转的角度
    controls.minPolarAngle = 0.25 * Math.PI

    // 禁止缩放
    controls.enableDamping = true
})();

// 将原生dom3D渲染到3D场景中
(function create3DRenderer(){
    // 文本3D渲染器
    css3DRenderer = new CSS3DRenderer()
    // 渲染器大小
    css3DRenderer.setSize(window.innerWidth, window.innerHeight)
    // 默认去除dom事件
    css3DRenderer.domElement.style.pointerEvents = 'none'
    // 设置固定定位
    css3DRenderer.domElement.style.position = 'fixed'
    // 顶部距离
    css3DRenderer.domElement.style.top = '0'
    // 左侧距离
    css3DRenderer.domElement.style.left = '0'
    // 添加到body中
    document.body.appendChild(css3DRenderer.domElement)
})();


// 创建坐标轴

// (function createHelper(){
//     const axesHelper = new THREE.AxesHelper(5)
//     scene.add(axesHelper)
// })();


// 场景适配
(function resizeRender(){
    // 监听浏览器窗口变化
    window.addEventListener('resize', ()=>{
        // 自适应画布宽高比
        renderer.setSize(window.innerWidth, window.innerHeight)
        // 自适应摄像机宽高比
        camera.aspect = window.innerWidth/window.innerHeight
        // 更新锥体空间
        camera.updateProjectionMatrix()
    })
})();

// 循环渲染
(function renderLoop(){
  
    // 通过轨道控制器实例方法调用update实现场景更新
    controls.update()

    // 场景摄像机渲染到画布
    renderer.render(scene, camera)

    // 场景和相机渲染文本画布上
    css3DRenderer.render(scene, camera)

      // 循环更新渲染
      requestAnimationFrame(renderLoop)
})();