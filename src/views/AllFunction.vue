<template>
  <Welcome></Welcome>
  <div class="gutter-example">
    <a-row :gutter="16" type="flex" justify="center" style="margin-top: 80px">
      <a-col class="gutter-row" :span="4" >
        <div class="gutter-box" style="text-align: center" @click="toWordToPdf">
          <a-card class="setShadow" :class="bClass=='word'?'changeBg':null" @mouseenter="enter('word')" @mouseleave="leave()">
            <img src="svg/word-pdf.svg" type="image/svg+xml" style="width: 80px" />
            <div style="font-size: 20px">WORD转PDF</div>
          </a-card>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="text-align: center" @click="toPdfToWord">
          <a-card class="setShadow" :class="bClass=='pdf'?'changeBg':null" @mouseenter="enter('pdf')" @mouseleave="leave()">
            <img src="svg/pdf-word.svg" type="image/svg+xml" style="width: 80px" >
            <div style="font-size: 20px">PDF转WORD</div>
          </a-card>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="text-align: center;font-style: normal" @click="toImgAddTextLogo">
          <a-card class="setShadow" :class="bClass=='text'?'changeBg':null" @mouseenter="enter('text')" @mouseleave="leave()">
            <img src="svg/img-text.svg" type="image/svg+xml" style="width: 80px"/>
            <div style="font-size: 20px">添加文字水印</div>
          </a-card>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="text-align: center;font-style: normal" @click="toImgAddImgLogo">
          <a-card class="setShadow" :class="bClass=='img'?'changeBg':null" @mouseenter="enter('img')" @mouseleave="leave()">
            <img src="svg/img-img.svg" type="image/svg+xml" style="width: 80px"/>
            <div style="font-size: 20px">添加图片水印</div>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
  <div class="gutter-example">
    <a-row :gutter="16" type="flex" justify="center" style="margin-top: 50px">
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="text-align: center;font-style: normal" @click="toCompressImg">
          <a-card class="setShadow" :class="bClass=='compress'?'changeBg':null " @mouseenter="enter('compress')" @mouseleave="leave()">
            <img src="svg/compress-image.svg" type="image/svg+xml" style="width: 80px"/>
            <div style="font-size: 20px">压缩图片</div>
          </a-card>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div class="gutter-box" style="text-align: center;font-style: normal" @click="toImgToPdf">
          <a-card class="setShadow" :class="bClass=='merge'?'changeBg':null " @mouseenter="enter('merge')" @mouseleave="leave()">
            <img src="svg/img-pdf.svg" type="image/svg+xml" style="width: 80px"/>
            <div style="font-size: 20px">图片合并为PDF</div>
          </a-card>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div  class="gutter-box" style="text-align: center;font-style: normal" @click="toWordToHtml">
          <a-card class="setShadow" :class="bClass=='wordToHtml'?'changeBg':null " @mouseenter="enter('wordToHtml')" @mouseleave="leave()">
            <img src="svg/word-html.svg" type="image/svg+xml" style="width: 80px"/>
            <div style="font-size: 20px">WORD转HTML</div>
          </a-card>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="4">
        <div  class="gutter-box" style="text-align: center;font-style: normal" @click="toPdfToPptx">
          <a-card class="setShadow" :class="bClass=='pdfToPptx'?'changeBg':null " @mouseenter="enter('pdfToPptx')" @mouseleave="leave()">
            <img src="svg/pdf-pptx.svg" type="image/svg+xml" style="width: 80px"/>
            <div style="font-size: 20px">PDF转PPTX</div>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>

import {reactive, toRefs} from "vue";
import {useRouter} from "@/router";
import Welcome from "@/views/Welcome";

export default {
  name: "AllFunction",

  components:{
    Welcome
  },
  
  setup() {

    const state=reactive({
      bClass:'',
      htmlText:''
    })

    const enter = (id) => {
      state.bClass=id
    }

    const leave = () => {
      state.bClass=''
    }

    const router = useRouter()
    const toWordToPdf = () => {
      router.push({
        path:"/WordToPdf"
      })
    };
    const toPdfToWord = () => {
      router.push({
        path:"/PdfToWord"

      })
    };
    const toImgAddTextLogo=()=>{
      router.push({
        path:"/ImgAddTextLogo"

      })
    }
    const toImgAddImgLogo=()=>{
      router.push({
        path:"/ImgAddImgLogo"

      })
    }

    const toCompressImg = () => {
      router.push({
        path:"/CompressImg"
      })
    }

    const toImgToPdf = () => {
      router.push({
        path:"/ImgToPdf"
      })
    }

    const toWordToHtml = () => {
      router.push({
        path:"/WordToHtml"
      })
    }

    const toPdfToPptx = () => {
      router.push({
        path:"/PdfToPptx"
      })
    }

    return {
      ...toRefs(state),
      enter,
      leave,
      toWordToPdf,
      toPdfToWord,
      toImgAddTextLogo,
      toImgAddImgLogo,
      toCompressImg,
      toImgToPdf,
      toWordToHtml,
      toPdfToPptx
    }
  }
}
</script>

<style scoped>
.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}
.gutter-box {
  padding: 5px 0;
}
.changeBg{
  background: rgba(139,255,201,0.08);
  color: dodgerblue;

}
</style>