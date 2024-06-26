<script setup>
import {useRouter} from "vue-router";

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const {list} = props
const router = useRouter()

const handleDetail = (application) => {
  router.push({
    name: "approvalDetail",
    params: {
      applicationId: application.applicationId
    },
    query: {applicant: application.applicant.name, approver: application.approver.name, title: application.title, description: application.description, status: application.status, priority: application.priority}
  })
}
</script>

<template>
<div class="list-wrapper">
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="title" label="申请标题" width="180"></el-table-column>
    <el-table-column prop="applicant.name" label="申请人" width="180"></el-table-column>
    <el-table-column prop="approver.name" label="审批人" width="180"></el-table-column>
    <el-table-column prop="applicationTime" label="申请时间" width="180"></el-table-column>
    <el-table-column prop="priority" label="优先级" width="100"></el-table-column>
    <el-table-column label="操作" width="120">
      <template v-slot="scope">
        <el-button @click="handleDetail(scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<style scoped>

</style>
