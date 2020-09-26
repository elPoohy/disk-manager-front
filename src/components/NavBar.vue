<template>
  <div class="NavBar">
    <el-menu
        :default-active="activeIndex"
        background-color="#F4F6F8"
        text-color="#22324e"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect">
      <el-menu-item index="Home">
        <el-image

          style="width: 62px; height: 48px"
          src="https://www.datafort.ru/local/templates/main/img/logo.svg"
          :fit="contain"></el-image>
      </el-menu-item>
      <el-submenu index="Tenants" v-if="isAdmin">
        <template slot="title">
          <i class="el-icon-setting"></i>
          Администрирование
        </template>
        <el-menu-item index="/tenants">Тенанты</el-menu-item>
        <el-menu-item index="AllWholesalle">Wholesalle</el-menu-item>
        <el-menu-item index="Quotes">Квоты</el-menu-item>
      </el-submenu>
      <el-submenu index="Users">
        <template slot="title">
          <i class="el-icon-user"></i>
          Пользователи
        </template>
        <el-menu-item index="/users">Список</el-menu-item>
        <el-menu-item index="/users-disabled">Заблокированные</el-menu-item>
        <el-menu-item index="DeletedUsers">Удалённые</el-menu-item>
      </el-submenu>
      <el-submenu index="Groups">
        <template slot="title">
          <i class="el-icon-folder"></i>
          Группы
        </template>
        <el-menu-item index="AllGroups">Список</el-menu-item>
        <el-menu-item index="SharedFolders">Общие папки</el-menu-item>
      </el-submenu>
      <el-submenu index="Stats">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            Статистика
          </template>
          <el-menu-item index="FullStat">Общая статистика</el-menu-item>
          <el-menu-item index="UtilisationStats">Потребление</el-menu-item>
      </el-submenu>
      <el-menu-item index="/logout" >Выйти</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    };
  },
  computed: {
    ...mapGetters(['isAdmin'])
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key)
    }
  }
}
</script>