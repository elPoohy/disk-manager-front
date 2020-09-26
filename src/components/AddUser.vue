<template>
  <div class="add-tenant">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm" label-position="right">
    <el-form-item label="Почтовый ящик пользователя" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Имя пользователя" prop="displayName">
      <el-input v-model="ruleForm.displayName"></el-input>
    </el-form-item>
    <el-form-item label="Квота администратора тенанта" prop="quota">
      <el-select v-model="ruleForm.quota" placeholder="Квота администратора тенанта">
        <el-option label="100 Гб" value=100></el-option>
        <el-option label="300 Гб" value=300></el-option>
        <el-option label="1 Тб" value=1000></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Поддержка оффиса" prop="office">
      <el-checkbox name="office"></el-checkbox>
    </el-form-item>
    <el-form-item label="Тенант" prop="tenant" v-if="isAdmin">
      <el-select v-model="ruleForm.tenant" placeholder="...">
        <el-option :key="key" :label="tenant.organization" :value="tenant.id" v-for="(tenant, key) in allTenants"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm('ruleForm')">Сбросить</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')" icon="el-icon-check">Создать</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      ruleForm: {
        email: '',
        displayName: '',
        quota: 100,
        office: true
      },
      rules: {

        email: [
          { required: true, message: 'Пожалуйста укажите название тенанта', trigger: 'blur' },
          { type: 'email', message: 'Пожалуйста, введите коректный почтовый ящик', trigger: ['blur', 'change']}
          ],
        displayName:[
          { required: true, message: 'Пожалуйста, укажите имя администратора', trigger: 'blur' },
        ],
        quota: [
          { required: true, message: 'Пожалуйста укажите квоту', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['isAdmin','allTenants'])
  },
  mounted() {
    this.$store.dispatch('ALL_TENANTS')
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const newuser = {
            email: this.ruleForm.email,
            displayName: this.ruleForm.displayName,
            quota: this.ruleForm.quota,
            office: this.ruleForm.office
          }
          this.$store.dispatch('CREATE_USER', newuser)
          this.resetForm(formName)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>