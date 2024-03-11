import './style.css'

import { scene, camera } from './utils/init'

import * as THREE from 'three'

import guiMove from './utils/gui'


// 创建分组

const group = new THREE.Group()


//准备数据
const sceneInfoObj = {
  // 第一个场景数据
  one: {
    // 纹理加载器公共路径
    publicPath: '/technology/1/',
    // 需要加载的图片资源
    imageUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    // 标记点数据
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [-0.46, -0.11, -0.11],
        rotation: [1.42, 0.68, 1.63],
        targetAttr: 'two'
      }
    ]
  },
  // 第二个场景
  two: {
    // 纹理加载器公共路径
    publicPath: '/technology/2/',
    // 需要加载的图片资源
    imageUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    // 标记点数据
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [0.35, -0.09, -0.03],
        rotation: [4.72, 0.89, 2.36],
        targetAttr: 'one'
      },
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [-0.46, -0.11, -0.11],
        rotation: [1.42, 0.68, 1.63],
        targetAttr: 'three'
      }
    ]
  },
  // 第三个场景
  three: {
    // 纹理加载器公共路径
    publicPath: '/technology/3/',
    // 需要加载的图片资源
    imageUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    // 标记点数据
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [0.4, -0.18, 0.32],
        rotation: [-1.53, -0.04, -1.26],
        targetAttr: 'two'
      },
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [0.32, -0.16, -0.33],
        rotation: [1.46, 0.1, -0.17],
        targetAttr: 'four'
      }
    ]
  },
  // 第四个场景
  four:{
     // 纹理加载器公共路径
     publicPath: '/technology/4/',
     // 需要加载的图片资源
     imageUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
     // 标记点数据
     markList: [
       {
         name: 'landMark',
         imgUrl: 'other/landmark.png',
         wh: [0.05, 0.05],
         position: [-0.35, -0.22, 0.4],
         rotation: [-0.85, -0.45, -1.8],
         targetAttr: 'three'
       },
       {
         name: 'dom',
        //  imgUrl: 'other/landmark.png',
        //  wh: [0.05, 0.05],
         position: [0.49, 0, 0],
         rotation: [0, -0.5*Math.PI, 0],
         targetAttr: 'five'
       }
     ]
  },
  // 第五个场景
  five:{
    // 纹理加载器公共路径
    publicPath: '/technology/5/',
    // 需要加载的图片资源
    imageUrlArr: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    // 标记点数据
    markList: [
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [-0.05, -0.08, 0.46],
        rotation: [5.41, 2.91, 4.79],
        targetAttr: 'four'
      },
      {
        name: 'landMark',
        imgUrl: 'other/landmark.png',
        wh: [0.05, 0.05],
        position: [-0.05, -0.08, 0.46],
        rotation: [5.41, 2.91, 4.79],
        targetAttr: 'six'
      },
      {
        name:'video',
        imgUrl: 'video/movie.mp4',
        position: [0.49, 0.04, 0.045],
        rotation: [0, -0.5*Math.PI, 0],
      }
    ]
  },
  six: {
    // 纹理加载的公共资源路径
    publicPath: "technology/6/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
  }
}


// 创建立方缓冲几何体
function createCube() {

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide
  })

  // 创建图形
  const geometry = new THREE.BoxGeometry(1, 1, 1)

  // 创建物体对象将图形渲染到物体上
  const cube = new THREE.Mesh(geometry, material)

  // 场景进行反转
  cube.scale.set(1, 1, -1)


  // 将物体添加到场景
  scene.add(cube)
  // 将物体对象返回给函数
  return cube
}

// 创建纹理加载器并对立方缓冲几何体贴图
function setMaterialCube(infoObj) {
  // 清除上一个场景标记点
  clear()

  // 解构出公共资源路径
  const { publicPath, imageUrlArr, markList } = infoObj
  // 纹理加载器
  const textureLoader = new THREE.TextureLoader()
  // 创建纹理加载路径
  textureLoader.setPath(publicPath)
  const materialArr = imageUrlArr.map(item => {
    // 加载纹理
    const texturl = textureLoader.load(item)
    // 图片颜色通道rgb
    texturl.colorSpace = THREE.SRGBColorSpace
    // 创建材质
    return new THREE.MeshBasicMaterial({
      map: texturl,
      // 双面渲染
      side: THREE.DoubleSide
    })
  })

  cubeObj.material = materialArr

  // 循环遍历标记点
  markList.forEach(markObj => {
    // 如果场景里存在标记点则调用创建标记点方法
    if (markObj.name === 'landMark') createLandMark(markObj)
  })
  // 几何体添加到分组
  scene.add(group)

}
// 创建标记点贴图
function createLandMark(infoObj) {
  const { name, imgUrl, wh, position, rotation, targetAttr } = infoObj
  const textureLoader = new THREE.TextureLoader()
  const geometry = new THREE.PlaneGeometry(...wh);
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(imgUrl),
    side: THREE.DoubleSide,
    // 设置背景透明
    transparent: true
  });
  const plane = new THREE.Mesh(geometry, material);

  // 设置物体坐标
  plane.position.set(...position)
  // 设置旋转角度
  plane.rotation.set(...rotation)

  // 设置标记点名称
  plane.name = name

  // 将标记点数据添加到物体上
  plane.userData.targetAttr = targetAttr


  // 调用gui工具
  guiMove(plane)

  group.add(plane)
}

// 清除上一个场景标记点
function clear() {
  const list = [...group.children]
  list.forEach(obj => {
    if (!obj.isCSS3DObject) {
      obj.geometry.dispose()
      obj.material.dispose()
    }
    group.remove(obj)
  })
}

// 3d场景添加点击事件
function bindClick() {
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  window.addEventListener('click', () => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(scene.children)

    const obj = intersects.find(item => item.object.name === 'landMark')
    if (obj) {
      const infoObj = sceneInfoObj[obj.object.userData.targetAttr]
      if (infoObj) setMaterialCube(infoObj)
    }

  })




}

// 调用几何缓冲体
const cubeObj = createCube()
bindClick()

//  调用对立方缓冲几何体贴图的方法
setMaterialCube(sceneInfoObj.one)

//  数据影响视图
