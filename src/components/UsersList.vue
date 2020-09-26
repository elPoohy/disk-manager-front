<template>
  <div class="users-list">
    <el-table
        :data="allUsers.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        stripe
        :default-sort = "{prop: 'organization', order: 'descending'}"
        style="width: 100%"
        v-loading="UsersStatus"
    >
      <el-table-column
          label="Почтовый адрес"
          prop="email"
          sortable>
      </el-table-column>
      <el-table-column
          label="Полное имя"
          prop="displayName"
          sortable>
      </el-table-column>
      <el-table-column
          v-if="isAdmin"
          label="Тенант"
          prop="tenant.organization"
          sortable
      >
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          Квоты
        </template>
        <template slot-scope="scope">

          <el-tooltip :content="'Свободно ' + scope.row.free + 'Гб'" placement="top" effect="light"><el-tag>{{ scope.row.quota }} Гб</el-tag></el-tooltip>&nbsp;
          <el-tag type="success" v-if="scope.row.office">Оффис</el-tag>&nbsp;
          <el-tag type="warning" v-if="scope.row.tenantAdmin">Админ</el-tag>&nbsp;
          <el-tag type="danger" v-if="scope.row.fullAdmin">Админ</el-tag>&nbsp;
        </template>
      </el-table-column>
      <el-table-column
          align="right">
        <template slot="header">
          <el-input
              v-model="search"
              size="mini"
              placeholder="Поиск..."/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row.id)"
              icon="el-icon-edit">
            Ред.
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id, scope.row.displayName)"
              icon="el-icon-delete">
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="Внимание!"
        :visible.sync="deleteDialog"
        width="30%">
      <span>Вы уверены, что хотите удалить {{ deleteName }} вместе со всеми его данными? Это действие нельзя будет отменить!</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialog = false">Cancel</el-button>
    <el-button type="danger" @click="DeleteTenant">Confirm</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default  {
  name: "UserssList",
  data() {
    return {
      search: '',
      deleteDialog: false,
      deleteID: '',
      deleteName: ''
    }
  },
  computed: { ...mapGetters(['allUsers', 'UsersStatus', 'isAdmin'])},
  mounted() {
    this.$store.dispatch("ALL_USERS")
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(id, name) {
      this.deleteID = id
      this.deleteName = name
      this.deleteDialog = true
    },
    DeleteTenant() {
      const tenant = {name: this.deleteID, id: this.deleteID}
      this.$store.dispatch("DELETE_USER", tenant)
    }
  },
}

</script>