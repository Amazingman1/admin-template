<template>
  <section class="component department-tree">
    <data-tree @select-change="onCurrentChange" ref="orgTree" :props="{title:'deptName'}" :data="departmentData"></data-tree>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Prop, Emit } from "vue-property-decorator";
import DataTree from "~/components/common/data-tree.vue";
@Component({
  components: {
    DataTree
  }
})
export default class DepartmentTree extends Vue {
  @Prop({type: Array, default: new Array()}) private departmentData;
  @Emit("onCurrentChange")
  private onCurrentChange(data, node) { }
}
</script>

<style lang="less" scoped>
</style>
