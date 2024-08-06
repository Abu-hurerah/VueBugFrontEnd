<template>
  <div>
    <span class="p-input-icon-left p-input-icon-right">
      <i :class="['pi', iconClass]" />
      <input
        class="inputFields"
        :type="type"
        :placeholder="label"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      required: true
    }
  },
};
</script>

<style scoped>
.inputFields {
  display: flex;
  align-items: center;
  height: 60px;
  border-radius: 12px;
  border: 2px solid #3170c2;
  background-color: #f9f9f9;
  width: 220%;
  padding-left: 29px;
  margin-bottom: 6px;  
  background-color: rgb(240, 235, 235);

}

</style>
