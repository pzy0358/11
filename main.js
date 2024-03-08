import './style.css'

import {scene} from './utils/init'

import * as THREE from 'three'

//准备数据
const sceneInfoObj = {
  // 第一个场景数据
  one:{
    // 纹理加载器公共路径
    publicPath:'/technology/1/',
    // 需要加载的图片资源
    imageUrlArr:['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg'],
    // 标记点数据
  }
} 


// 创建立方缓冲几何体
function createCube(infoObj){
  // 解构出公共资源路径
const {publicPath,imageUrlArr } = infoObj
  // 纹理加载器
  const textureLoader = new THREE.TextureLoader()
  // 创建纹理加载路径
  textureLoader.setPath(publicPath)

  const materialArr = imageUrlArr.map(item=>{
    // 加载纹理
    const texturl= textureLoader.load(item)
    // 图片颜色通道rgb
    texturl.colorSpace = THREE.SRGBColorSpace
    // 创建材质
    return new THREE.MeshBasicMaterial({ 
      map:texturl,
      // 双面渲染
      side:THREE.DoubleSide
    })
  })

  // 创建图形
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  
  // 创建物体对象将图形渲染到物体上
  const cube = new THREE.Mesh(geometry, materialArr)

  
  

  // 场景进行反转
  cube.scale.set(-1,1,1)

  // 将物体添加到场景
  scene.add(cube)
  // 将物体对象返回给函数
  return cube
}

// 调用几何缓冲体
 const cubeObj = createCube(sceneInfoObj.one)

//  数据影响视图
