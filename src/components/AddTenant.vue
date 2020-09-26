<template>
  <div class="add-tenant">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm" label-position="right">
    <el-form-item label="Организация" prop="organization">
      <el-input v-model="ruleForm.organization"></el-input>
    </el-form-item>
    <el-form-item label="Тенант" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Заказ" prop="order">
      <el-input v-model="ruleForm.order"></el-input>
    </el-form-item>
    <el-form-item label="Почтовый ящик администратора тенанта" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Имя администратора тенанта" prop="displayName">
      <el-input v-model="ruleForm.displayName"></el-input>
    </el-form-item>
    <el-form-item label="Квота администратора тенанта" prop="quota">
      <el-select v-model="ruleForm.quota" placeholder="Квота администратора тенанта">
        <el-option label="100 Гб" value=100></el-option>
        <el-option label="300 Гб" value=300></el-option>
        <el-option label="1 Тб" value=1000></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Тип тенанта" prop="type">
      <el-select v-model="ruleForm.type" placeholder="Тип создаваемого тенанта">
        <el-option label="Триал на две недели" value="trial"></el-option>
        <el-option label="Комерческое включение" value="enabled"></el-option>
        <el-option label="Новый Wholesale" value="wholesale"></el-option>
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
export default {
  data() {
    return {
      ruleForm: {
        organization: '',
        name: '',
        order: '',
        email: '',
        displayName: '',
        quota: 100,
        type: 'trial',
      },
      rules: {
        organization: [
          { required: true, message: 'Пожалуйста укажите название тенанта', trigger: 'blur' },
        ],
        name: [
          { required: true, message: 'Пожалуйста укажите имя тенанта', trigger: 'blur' },
          { min: 3, max: 20, message: 'Длина должна быть о 3 до 20 символов', trigger: 'blur' }
        ],
        order: [
            { required: true, message: 'Пожалуйста укажите номер заказа', trigger: 'blur' }
            ],
        email: [
          { required: true, message: 'Пожалуйста укажите название тенанта', trigger: 'blur' },
          { type: 'email', message: 'Пожалуйста, введите коректный почтовый ящик', trigger: ['blur', 'change']}
          ],
        displayName:[
          { required: true, message: 'Пожалуйста, укажите имя администратора', trigger: 'blur' },
        ],
        quota: [
          { required: true, message: 'Пожалуйста укажите квоту', trigger: 'change' }
        ],
        type: [
          { required: true, message: 'Пожалуйста выберите тип', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const newtenant = {
            name: this.ruleForm.name,
            organization: this.ruleForm.organization,
            order: this.ruleForm.order,
            email: this.ruleForm.email,
            displayName: this.ruleForm.displayName,
            quota: this.ruleForm.quota,
            type: this.ruleForm.type
          }
          this.$store.dispatch('CREATE_TENANT', newtenant)
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