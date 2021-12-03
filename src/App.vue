<template>
  <!-- use geetest button to show capthca -->
  <div v-if="useNativeButton" class="captcha-wrap"></div>

  <!-- define button to show capthca -->
  <button v-else @click="showCaptchaByCustomBtn" class="captcha-btn">
    Custom Button
  </button>
</template>

<script>
import useCaptcha from "./useCaptcha";
export default {
  name: "App",
  
  setup() {
    const {
      initCaptcha,
      useNativeButton,
      showCaptchaByNativeBtn,
      showCaptchaByCustomBtn,
      onSuccess,
    } = useCaptcha();

    // use native button
    useNativeButton.value = true;

    (async function () {
      // wait for Captcha instance
      await initCaptcha();

      useNativeButton.value && showCaptchaByNativeBtn(".captcha-wrap");
      
      const res = await onSuccess();
      console.log("res: ", res);
    })();

    return {
      useNativeButton,
      showCaptchaByCustomBtn,
    };
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
