<script setup>
import {ref, reactive, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const application = reactive({})
const isFromSubmitted = ref(false)
const isEditable = ref(false)
const getPriorityTag = (priority) => {
  switch (priority) {
    default:
    case '底':
      return 'primary'
    case '中':
      return 'warning'
    case '高':
      return 'danger'
  }
}

const getStatusTag = (status) => {
  switch (status) {
    default:
    case '待审批':
      return 'primary'
    case '已通过':
      return 'success'
    case '未通过':
      return 'warning'
  }
}
const init = () => {
      application.applicant = route.query.applicant
      application.approver = route.query.approver
      application.title = route.query.title
      application.description = route.query.description
      application.status = route.query.status
      application.priority = route.query.priority || '中' // 默认优先级为“中”
      application.approverRemarks = route.query.approverRemarks || ''
      isFromSubmitted.value = route.query.isFromSubmitted === 'true'
}

onMounted(() => {
  init()
})

</script>

<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="() => router.back()" title="审批详情" />
    <div style="margin-top: 20px">
      <van-form>
        <van-cell-group inset>
          <van-cell title="审批状态">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-tag :type="getStatusTag(application.status)">{{application.status}}</van-tag>
            </template>
          </van-cell>
          <van-cell title="优先级">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-tag :type="getPriorityTag(application.priority)">{{application.priority}}</van-tag>
            </template>
          </van-cell>
          <van-field
              label-align="top"
              v-model="application.approver"
              label="申请人"
          />
          <van-field
              label-align="top"
              v-model="application.applicant"
              label="审批人"
          />
          <van-field
              label-align="top"
              v-model="application.title"
              label="申请标题"
          />
          <van-field
              label-align="top"
              v-model="application.description"
              label="申请内容"
          />
          <van-field
              v-model="application.approverRemarks"
              rows="3"
              autosize
              label="审批意见"
              type="textarea"
              placeholder="请输入审批意见"
          />
        </van-cell-group>


      </van-form>
      <div style="margin: 16px;">
        <van-button round block type="success">
          通过
        </van-button>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="warning">
          驳回
        </van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
