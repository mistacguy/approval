<script setup>
import {ref, reactive, onMounted} from "vue";
import {useUserStore} from "@/store/modules/user.js";
import {UserApi} from "@/api/user.js";
const useStore = useUserStore()
const showApprovalPicker = ref(false);
const showPriorityPicker = ref(false);
const approvalName = ref('')
const form = reactive({
  applicant: '',
  approver: '',
  title: '',
  description: '',
  priority: '',
  status: '待审批'
})

const priorityList = [
  {
    text:'高',
    value:'高'
  },
  {
    text: '中',
    value: '中'
  },
  {
    text: '低',
    value: '低'
  }
]

const approvers = ref([])

const onApprovalConfirm = ({selectedOptions}) => {
  showApprovalPicker.value = false;
  approvalName.value = selectedOptions[0].text
  form.approver = selectedOptions[0].value
}

const onPriorityConfirm = ({selectedOptions}) => {
  console.log(selectedOptions)
  showPriorityPicker.value = false;
  form.priority = selectedOptions[0].value
}

onMounted(async () => {
  form.applicant = useStore ? useStore.name : '未知申请人';
  const res = await UserApi.fetchApprovers({
    orgId: 1001104
  })
  approvers.value = res.data.departUserList.userList.map(user => ({
    value: user.phone,
    text: user.userName
  }));
})
</script>

<template>
<div>
  <van-nav-bar left-arrow @click-left="() => router.back()" title="审批详情" />
  <van-form style="margin-top: 20px" @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="form.applicant"
          name="申请人"
          label="申请人"
          readonly
      />
      <van-field
          v-model="approvalName"
          is-link
          readonly
          label="审批人"
          placeholder="审批人"
          @click="showApprovalPicker = true"
      />
      <van-popup v-model:show="showApprovalPicker" round position="bottom">
        <van-picker
            :columns="approvers"
            @cancel="showApprovalPicker = false"
            @confirm="onApprovalConfirm"
        />
      </van-popup>
      <van-field
          v-model="form.title"
          name="申请标题"
          label="申请标题"
          placeholder="请输入申请标题"
      />
      <van-field
          v-model="form.description"
          type="textarea"
          name="申请说明"
          label="申请说明"
          placeholder="请输入申请说明"
      />
      <van-field
          v-model="form.priority"
          is-link
          readonly
          label="优先级"
          placeholder="请选择优先级"
          @click="showPriorityPicker = true"
      />
      <van-popup v-model:show="showPriorityPicker" round position="bottom">
        <van-picker
            :columns="priorityList"
            @cancel="showPriorityPicker = false"
            @confirm="onPriorityConfirm"
        />
      </van-popup>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</div>
</template>

<style scoped>

</style>
