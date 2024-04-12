import {
  Select,
  Card,
  Button,
  Input,
  Form,
  Checkbox,
  Radio,
  Row,
  Col,
  Layout,
  Space,
  Menu,
  Dropdown,
  Tabs,
  Modal,
  Steps,
  TreeSelect, 
  Table,
} from 'ant-design-vue'

const antdev = {
  install(app) {
    // 最常用组件作为全局方式依赖,以下组件不需要每个页面单独引用即可使用
    app.use(Space)
    app.use(Col)
    app.use(Row)
    app.use(Card)
    app.use(Button)
    app.use(Select)
    app.use(Input)
    app.use(Button)
    app.use(Layout)
    app.use(Form)
    app.use(Checkbox)
    app.use(Radio)
    app.use(Menu)
    app.use(Dropdown)
    app.use(Tabs)

    app.use(Modal)
    app.use(Steps)
    app.use(TreeSelect)
    app.use(Table)
  }
}

export default antdev
