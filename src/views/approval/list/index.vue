<script setup>
import {onMounted, ref, watch} from "vue";
import ApprovalList from "@/views/approval/list/components/approval-list.vue";
import {useRouter} from "vue-router";
const router = useRouter()
const activeName = ref('a')
const applications = ref([])
const filteredApplications = ref([])
const fetchApplications = () => {
  const mockApplications =
      [
        {
          "applicationId": "unique-id-12345",
          "applicant": {
            "id": "userid001",
            "name": "黄岳峰",
            "departmentId": "1000",
            "departmentName": "测试"
          },
          "approver": {
            "id": "userid002",
            "name": "李四",
            "departmentId": "2000",
            "departmentName": "技术部"
          },
          "title": "请假申请",
          "description": "申请请假三天",
          "status": "待审批",
          "applicationTime": "2023-06-25T12:00:00Z",
          "approvalTime": null,
          "remarks": "需要提前处理",
          "approverRemarks": null,
          "priority": "高",
          "attachments": [
            {
              "fileId": "file-id-001",
              "fileName": "假条.pdf",
              "fileUrl": "http://example.com/file/假条.pdf"
            }
          ]
        },
        {
          "applicationId": "unique-id-12346",
          "applicant": {
            "id": "userid003",
            "name": "张三",
            "departmentId": "1001",
            "departmentName": "市场部"
          },
          "approver": {
            "id": "userid004",
            "name": "王五",
            "departmentId": "2001",
            "departmentName": "人事部"
          },
          "title": "报销申请",
          "description": "报销差旅费",
          "status": "待审批",
          "applicationTime": "2023-06-26T08:00:00Z",
          "approvalTime": null,
          "remarks": "需要尽快处理",
          "approverRemarks": null,
          "priority": "中",
          "attachments": [
            {
              "fileId": "file-id-002",
              "fileName": "报销单.pdf",
              "fileUrl": "http://example.com/file/报销单.pdf"
            }
          ]
        },
        {
          "applicationId": "unique-id-12347",
          "applicant": {
            "id": "userid005",
            "name": "李强",
            "departmentId": "1002",
            "departmentName": "销售部"
          },
          "approver": {
            "id": "userid006",
            "name": "赵六",
            "departmentId": "2002",
            "departmentName": "财务部"
          },
          "title": "项目申请",
          "description": "申请新项目资金",
          "status": "已通过",
          "applicationTime": "2023-06-27T10:00:00Z",
          "approvalTime": "2023-06-28T10:00:00Z",
          "remarks": "请及时处理",
          "approverRemarks": "批准",
          "priority": "高",
          "attachments": [
            {
              "fileId": "file-id-003",
              "fileName": "项目申请.pdf",
              "fileUrl": "http://example.com/file/项目申请.pdf"
            }
          ]
        },
        {
          "applicationId": "unique-id-12348",
          "applicant": {
            "id": "userid007",
            "name": "王二",
            "departmentId": "1003",
            "departmentName": "研发部"
          },
          "approver": {
            "id": "userid008",
            "name": "孙七",
            "departmentId": "2003",
            "departmentName": "行政部"
          },
          "title": "调休申请",
          "description": "申请调休两天",
          "status": "已通过",
          "applicationTime": "2023-06-28T09:00:00Z",
          "approvalTime": "2023-06-29T09:00:00Z",
          "remarks": "下周再处理",
          "approverRemarks": "批准",
          "priority": "中",
          "attachments": [
            {
              "fileId": "file-id-004",
              "fileName": "调休申请.pdf",
              "fileUrl": "http://example.com/file/调休申请.pdf"
            }
          ]
        },
        {
          "applicationId": "unique-id-12349",
          "applicant": {
            "id": "userid009",
            "name": "陈八",
            "departmentId": "1004",
            "departmentName": "人力资源部"
          },
          "approver": {
            "id": "userid010",
            "name": "吴九",
            "departmentId": "2004",
            "departmentName": "法务部"
          },
          "title": "活动申请",
          "description": "申请举办团建活动",
          "status": "未通过",
          "applicationTime": "2023-06-29T11:00:00Z",
          "approvalTime": "2023-06-30T11:00:00Z",
          "remarks": "活动预算不足",
          "approverRemarks": "驳回",
          "priority": "低",
          "attachments": [
            {
              "fileId": "file-id-005",
              "fileName": "活动申请.pdf",
              "fileUrl": "http://example.com/file/活动申请.pdf"
            }
          ]
        },
        {
          "applicationId": "unique-id-12350",
          "applicant": {
            "id": "userid011",
            "name": "许十",
            "departmentId": "1005",
            "departmentName": "运营部"
          },
          "approver": {
            "id": "userid012",
            "name": "郑十一",
            "departmentId": "2005",
            "departmentName": "客服部"
          },
          "title": "设备采购申请",
          "description": "申请采购新设备",
          "status": "未通过",
          "applicationTime": "2023-06-30T14:00:00Z",
          "approvalTime": "2023-07-01T14:00:00Z",
          "remarks": "预算超标",
          "approverRemarks": "驳回",
          "priority": "中",
          "attachments": [
            {
              "fileId": "file-id-006",
              "fileName": "设备采购申请.pdf",
              "fileUrl": "http://example.com/file/设备采购申请.pdf"
            }
          ]
        }
      ];

  applications.value = mockApplications;
  filteredApplications.value = mockApplications;
}



onMounted(() => {
  fetchApplications();
})

watch(
    () => activeName.value,
    (newVal) => {
      if (newVal === 'all') {
        filteredApplications.value = applications.value;
      } else {
        filteredApplications.value = applications.value.filter(app => app.status === newVal);
      }
      console.log('change')
    }
)
</script>

<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="() => router.back()" title="审批列表" />
    <van-tabs v-model:active="activeName">
      <van-tab title="全部" name="all">
        <approval-list :list="filteredApplications"></approval-list>
      </van-tab>
      <van-tab title="待审批" name="待审批">
        <approval-list :list="filteredApplications"></approval-list>
      </van-tab>
      <van-tab title="已通过" name="已通过">
        <approval-list :list="filteredApplications"></approval-list>
      </van-tab>
      <van-tab title="未通过" name="未通过">
        <approval-list :list="filteredApplications"></approval-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
</style>
