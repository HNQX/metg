<template>
  <div class="container">
    <Breadcrumb :items="['menu.account', 'menu.account.manage']" />
    <a-card class="general-card" :title="$t('menu.list.searchTable')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="number" :label="$t('searchTable.form.number')">
                  <a-input v-model="formModel.number" :placeholder="$t('searchTable.form.number.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('searchTable.form.name')">
                  <a-input v-model="formModel.name" :placeholder="$t('searchTable.form.name.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="contentType" :label="$t('searchTable.form.contentType')">
                  <a-select v-model="formModel.contentType" :options="contentTypeOptions"
                    :placeholder="$t('searchTable.form.selectDefault')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="filterType" :label="$t('searchTable.form.filterType')">
                  <a-select v-model="formModel.filterType" :options="filterTypeOptions"
                    :placeholder="$t('searchTable.form.selectDefault')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="createdTime" :label="$t('searchTable.form.createdTime')">
                  <a-range-picker v-model="formModel.createdTime" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" :label="$t('searchTable.form.status')">
                  <a-select v-model="formModel.status" :options="statusOptions"
                    :placeholder="$t('searchTable.form.selectDefault')" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table row-key="_id" :loading="loading" :pagination="pagination" :data="renderData" :bordered="false"
        @page-change="onPageChange">
        <template #columns>
          <a-table-column :title="$t('table.form.id')" data-index="_id" />
          <a-table-column :title="$t('table.form.username')" data-index="username" />
          <a-table-column :title="$t('table.form.code')" data-index="code" />
          <a-table-column :title="$t('table.form.note')" data-index="note" />
          <a-table-column :title="$t('table.form.visit')" data-index="visit" />
          <a-table-column :title="$t('table.form.createTime')" data-index="createTime" />
          <a-table-column :title="$t('table.form.isCustom')" data-index="isCustom">
            <template #cell="{ record }">
              <span v-if="record.isCustom" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ $t(`table.form.isCustom.${record.isCustom}`) }}
            </template>
          </a-table-column>
          <a-table-column :title="$t('searchTable.columns.operations')" data-index="operations">
            <template #cell>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('searchTable.columns.operations.view') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { getUrl } from '@/api/account';
import useLoading from '@/hooks/loading';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const renderData = ref([])
const { loading, setLoading } = useLoading(true)
const { t } = useI18n()

const basePagination = {
  current: 1,
  pageSize: 20,
}
const pagination = reactive({
  ...basePagination,
})

const contentTypeOptions = computed(() => [
  { label: t('searchTable.form.contentType.img'), value: 'img' },
  { label: t('searchTable.form.contentType.horizontalVideo'), value: 'horizontalVideo' },
  { label: t('searchTable.form.contentType.verticalVideo'), value: 'verticalVideo' },
])
const filterTypeOptions = computed(() => [
  { label: t('searchTable.form.filterType.artificial'), value: 'artificial' },
  { label: t('searchTable.form.filterType.rules'), value: 'rules' },
])
const statusOptions = computed(() => [
  { label: t('searchTable.form.status.online'), value: 'online' },
  { label: t('searchTable.form.status.offline'), value: 'offline' },
])
const generateFormModel = () => {
  return {
    number: '',
    name: '',
    contentType: '',
    filterType: '',
    createdTime: [],
    status: '',
  }
}
const formModel = ref(generateFormModel())
const fetchData = async (params = { username: 'han' }) => {
  setLoading(true)
  try {
    const { data } = await getUrl(params)
    console.log(data)
    renderData.value = data
    pagination.current = params.current
    pagination.total = data.total
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}

const search = () => {
  fetchData({
    ...basePagination,
    ...formModel.value,
  })
}
const onPageChange = (current) => {
  fetchData({ ...basePagination, current })
}

fetchData()
const reset = () => {
  formModel.value = generateFormModel()
}
</script>

<style scoped lang="less">
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
