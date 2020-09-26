<template>
  <div class="UsersDisabledPage">
    <h3>Список всех пользователей</h3>
    <UsersDisabledList />
  </div>
</template>

<script>

import UsersDisabledList from "@/components/UsersDisabledList";
export default {
  components: {
    UsersDisabledList,
  }
}

</script>