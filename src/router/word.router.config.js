export default [

    {
        path: '/ForgetPassword' ,
        name: 'ForgetPassword',
        meta: {title:'忘记密码'},
        component: ()=> import(/* webpackChunkName: "base" */ '@/views/others/ForgetPassword')
    },


    {
        path: '/WordToPdf',
        name: 'WordToPdf',
        meta: { title: 'word转pdf' },
        component: () => import(/* webpackChunkName: "base" */ '@/views/word/WordToPdf'),
        children: [

        ]
    },
    {
        path: '/PdfToWord',
        name: 'PdfToWord',
        meta: { title: 'pdf转word' },
        component: () => import(/* webpackChunkName: "base" */ '@/views/word/PdfToWord'),
    },
    {
        path: '/ImgAddTextLogo',
        name: 'ImgAddTextLogo',
        meta: { title: '图片添加文字logo' },
        component: () => import(/* webpackChunkName: "base" */ '@/views/img/ImgAddTextLogo'),
    }
    ,
    {
        path: '/ImgAddImgLogo',
        name: 'ImgAddImgLogo',
        meta: { title: '图片添加图片logo' },
        component: () => import(/* webpackChunkName: "base" */ '@/views/img/ImgAddImgLogo'),
    },
    {
        path: '/AllFunction',
        name: 'AllFunction',
        meta: { title: '所有功能' },
        component: () => import(/* webpackChunkName: "base" */ '@/views/AllFunction'),
    },
    {
        path: '/CompressImg',
        name: 'CompressImg',
        meta: {title: '压缩图片'},
        component: () => import(/* webpackChunkName: "base" */ '@/views/img/CompressImg'),
    },
    {
        path: '/ImgToPdf',
        name: 'ImgToPdf',
        meta: {title:'图片转PDF'},
        component: () => import(/* webpackChunkName: "base" */ '@/views/word/ImgToPdf')
    },
    {
        path: '/UpDownLoad',
        name: 'UpDownLoad',
        meta: {title:'文件上传下载'},
        component: () => import(/* webpackChunkName: "base" */ '@/views/others/UpDownLoad')
    },
    {
        path: '/WordToHtml',
        name: 'WordToHtml',
        meta: {title: 'word转html'},
        component:() => import(/* webpackChunkName: "base" */ '@/views/word/WordToHtml')
    },
    {
        path: '/PdfToPptx',
        name: 'PdfToPptx',
        meta: {title: 'word转html'},
        component:() => import(/* webpackChunkName: "base" */ '@/views/word/PdfToPptx')
    }
]