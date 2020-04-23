// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        box1: {
            default: null,
            type: cc.Node
        },
        box2: {
            default: null,
            type: cc.Node
        },
        dragData: {
            default:{},
            type: Object
        }

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dragData = {lx:0,ly:0,mx:0,my:0,isMove:false};
        console.log("onload")
    },

    start () {
        this.box2.active = false
        let faceBtnList = this.box1.children
        faceBtnList.forEach(btn => {
            btn.on("mouseup", event =>{this.selectFace(btn.name.replace(/[^0-9]/ig,""))})
        });
        console.log("start")
    },

    selectFace(id) {
        this.box1.active = false
        this.box2.active = true
        console.log(id)
        let face = this.box2.getChildByName("face"+id);
        console.log(face)
        if(face){
            for (let i = 0; i < face.children.length; i++) {
                face.children[i].on(cc.Node.EventType.TOUCH_START, event=> {
                    this.dragData.lx = event.getLocationX()
                    this.dragData.ly = event.getLocationY()
                    console.log("clickStart:",this.dragData)
                });
                face.children[i].on(cc.Node.EventType.TOUCH_MOVE, event=> {
                    this.dragData.lx = event.getLocationX()
                    this.dragData.ly = event.getLocationY()
                    console.log("clickMove:",this.dragData)
                });
                face.children[i].on(cc.Node.EventType.TOUCH_END, event=> {
                    this.dragData.lx = event.getLocationX()
                    this.dragData.ly = event.getLocationY()
                    console.log("clickEnd:",this.dragData)
                });
            
            }
        }
    },
    // update (dt) {},
});
