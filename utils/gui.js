import * as dat from 'dat.gui'

const gui = new dat.GUI()

// 创建gui方法
export default function guiMove(obj) {
    gui.add(obj.position,'x',-1,1,0.01).name('移动x')
    gui.add(obj.position,'y',-1,1,0.01).name('移动y')
    gui.add(obj.position,'z',-1,1,0.01).name('移动z')

    gui.add(obj.rotation,'x',-2,2*Math.PI,0.01).name('旋转x')
    gui.add(obj.rotation,'y',-2,2*Math.PI,0.01).name('旋转y')
    gui.add(obj.rotation,'z',-2,2*Math.PI,0.01).name('旋转z')
}