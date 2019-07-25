<template>
  <div class="row q-mb-sm">
    <q-input :value="dueTime" @input="$emit('update:dueTime',$event)" label="Due time" outlined>
      <template v-slot:append>
        <q-icon class="cursor-pointer" name="access_time">
          <q-popup-proxy transition-hide="scale" transition-show="scale">
            <q-time :value="dueTime" @input="$emit('update:dueTime',$event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['dueTime']
}
</script>