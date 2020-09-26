<template>
  <div class="about">
    <h3>Список всех пользователей</h3>
    <UsersList />
    <h3>Добавить пользователя</h3>
    <AddUser />
  </div>
</template>

<script>

import AddUser from "@/components/AddUser";
import UsersList from "@/components/UsersList";
export default {
  components: {
    UsersList,
    AddUser
  }
}

</script>