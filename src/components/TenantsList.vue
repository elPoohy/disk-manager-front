<template>
  <div class="tenants-list">
    <el-table
        :data="allTenants.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        stripe
        :default-sort = "{prop: 'organization', order: 'descending'}"
        style="width: 100%"
        v-loading="TenantStatus"
    >
      <el-table-column
          label="Организация"
          prop="organization"
          sortable>
      </el-table-column>
      <el-table-column
          label="Тенант"
          prop="name"
          sortable>
      </el-table-column>
      <el-table-column
          label="Заказ"
          prop="order">
      </el-table-column>
      <el-table-column
          label="Статус"
          prop="status">
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
              @click="handleDelete(scope.row.id, scope.row.organization, scope.row.name)"
              icon="el-icon-delete">
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="Внимание!"
        :visible.sync="deleteDialog"
        width="30%"
        :before-close="handleClose">
      <span>Вы уверены, что хотите удалить {{ deleteOrganization }} вместе со всеми пользователями и данными? Это действие нельзя будет отменить!</span>
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
  name: "TenantsList",
  data() {
    return {
      search: '',
      deleteDialog: false,
      deleteOrganization: '',
      deleteID: 0,
      deleteName: ''
    }
  },
  computed: { ...mapGetters(['allTenants', 'TenantStatus'])},
  mounted() {
    this.$store.dispatch("ALL_TENANTS")
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(id, organization, name) {
      this.deleteOrganization = organization
      this.deleteID = id
      this.deleteName = name
      this.deleteDialog = true
      console.log(id, organization);
    },
    DeleteTenant() {
      const tenant = {name: this.deleteName, id: this.deleteID}
      this.$store.dispatch("DELETE_TENANT", tenant)
    }
  },
}

</script>