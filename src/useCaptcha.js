import { ref, reactive } from "vue";

export default function useCaptcha() {
  // use geetest button to show captcha
  const useNativeButton = ref(true);

  // captcha instance
  let captcha = null;
  // captcha config
  const options = reactive({
    product: "float",
  });

  async function initCaptcha() {
    //   Ensure gt, challenge and success are not null
    const {
      data: { challenge, gt, new_captcha, success },
    } = await window.axios.get(
      `https://www.geetest.com/demo/gt/register-slide?t=${new Date().getTime()}`
    );
    Object.assign(options, { gt, challenge, new_captcha, offline: !success });

    options.product = useNativeButton.value ? "float" : "bind";

    return new Promise((resolve) => {
      window.initGeetest(options, (gt) => {
        captcha = gt;
        resolve(captcha);
      });
    });
  }

  function showCaptchaByNativeBtn(selector) {
    captcha.appendTo(selector);
  }

  function showCaptchaByCustomBtn() {
    captcha.verify();
  }

  function onSuccess() {
      return new Promise(resolve => {
        captcha.onSuccess(() => {
            resolve(captcha.getValidate())
          });
      })
  }

  return {
    useNativeButton,
    captcha,
    options,
    initCaptcha,
    showCaptchaByNativeBtn,
    showCaptchaByCustomBtn,
    onSuccess,
  };
}
