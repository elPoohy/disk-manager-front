<template>
  <div class="about">
    <h3>Список всех тенантов</h3>
    <TenantsList />
    <h3>Добавить тенант</h3>
    <AddTenant />
  </div>
</template>

<script>

import TenantsList from "@/components/TenantsList";
import AddTenant from "@/components/AddTenant";
export default {
  components: {
    TenantsList,
    AddTenant
  }
}

</script>