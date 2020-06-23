<template>
<div>
  <b-modal class="text-center" id="modal-setting" title="ตั้งค่าห้องสนทนา" centered hide-footer >
    <p class="my-4 text-center">Room 1</p>
     <div style="border-radius: 16px;">
    <b-form-group>
      <b-form-checkbox>
        รหัสผ่านห้องสนทนา
      </b-form-checkbox>
       <b-form-checkbox switch class="mr-n2"
       v-for="option in options"
        v-model="selected"
        :key="option.value"
        :value="option.value"
        name="flavour-3a"
        >
        {{ option.text }}
        <v-switch v-model="switch1" inset></v-switch>
      </b-form-checkbox>
    </b-form-group>
  </div>
  </b-modal>
</div>
</template>
<script>
export default {
  data () {
    return {
      switch1: false,
      selected: [], // Must be an array reference!
      options: [
        { text: 'ต้องผ่านการอนุมัติจากผู้ดูแลก่อนเข้าร่วม', value: 'orange' },
        { text: 'อนุญาตให้ผู้ใช้เริ่มการสนทนาได้เอง', value: 'apple' },
        { text: 'ปิดเสียงผู้ใช้เมื่อเข้วร่วม', value: 'pineapple' }
      ]
    }
  }
}
</script>
