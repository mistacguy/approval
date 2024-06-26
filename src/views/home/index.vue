<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const navigateTo = (path) => {
  router.push({
    path,
  })
}
</script>

<template>
<div class="container">
  <van-nav-bar title="审批系统" />
  <div class="main-content">
    <div class="approval-wrapper">
      <div @click="navigateTo('/approval/list')" class="approval-item">
        待审批
      </div>
      <div class="approval-item">
        审批完成
      </div>
    </div>
  </div>
  <div @click="navigateTo('/approval/create')" class="new-approval-wrapper">
    <span>
      新建
    </span>
  </div>
</div>
</template>

<style scoped>
.new-approval-wrapper {
  text-align: center;
  height: 4em;
  width: 4em;
  position: fixed;
  right: 30px;
  bottom: 30px;
  line-height: 4em;
  color: #fff;
  background-color: #646ffa;
  border-radius: 50%;
}

.approval-wrapper {
  display: flex;
  text-align: center;
  flex-direction: column;

}

.approval-item {
  height: 64px;
  line-height: 64px;
  margin-top: 20px;
  background: #fff;
  font-size: 16px;
  border-radius: 4px;
}
</style>
