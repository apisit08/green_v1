<template>
     <div id="meet"></div>
</template>
<script src="https://jitsidemo.cloudns.asia/external_api.js"></script>
<script>
export default {
  mounted () {
    var domain = 'oneconference-new.inet.co.th'
    var options = {
      roomName: 'test01',
      width: 1280,
      height: 720,
      parentNode: document.querySelector("#meet")
      //parentNode: undefined
      // configOverwrite: { startWithVideoMuted: true },
    }
    var api = new JitsiMeetExternalAPI(domain, options)
  }
}
</script>
