<template>
  <div id="app">
    <!-- use geetest button to show capthca -->
    <div v-if="useNativeButton" class="captcha-wrap"></div>

    <!-- define button to show capthca -->
    <button v-else @click="showCaptchaByCustomBtn" class="captcha-btn">Custom Button</button>
    
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      // use geetest button to show captcha
      useNativeButton: false,
      // verification result
      result: null,

      // captcha instance
      captcha: null,
      // captcha config
      options: {
        product: 'float'
      }
    };
  },

  async created() {
    this.options.product = this.useNativeButton ? 'float': 'bind'
    
    this.captcha = await this.initCaptcha();
    console.log('this.captcha: ', this.captcha);
    this.useNativeButton && this.showCaptchaByNativeBtn();
    this.onSuccess()
  },

  methods: {
    async initCaptcha() {
      //Ensure gt, challenge and success are not null
      const { data: { challenge, gt, new_captcha, success } } = await window.axios.get(`https://www.geetest.com/demo/gt/register-slide?t=${new Date().getTime()}`)
      this.options = {
        gt,
        challenge,
        new_captcha,
        offline: !success,
        ...this.options
      }
      
      return new Promise((resolve) => {
        window.initGeetest(this.options, gt => resolve(gt));
      });
    },

    showCaptchaByNativeBtn() {
      this.captcha.appendTo('.captcha-wrap')
    },

    showCaptchaByCustomBtn () {
      this.captcha.verify()
    },

    onSuccess() {
      this.captcha.onSuccess(() => {
        this.result = this.captcha.getValidate()
        console.log('result: ', this.result);
      })
    }
  },
};
</script>

<style>
.captcha-btn,
.captcha-wrap {
  display: block;
  width: 300px;
  margin: 300px auto;
}
</style>
