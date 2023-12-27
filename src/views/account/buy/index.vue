<template>
  <div class="container">
    <Breadcrumb :items="['menu.account', 'menu.account.buy']" />
    <a-card>购买</a-card>
  </div>
</template>

<script setup></script>

<style scoped lang="less">
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
