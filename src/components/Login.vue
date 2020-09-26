<template>
  <div class="Login">
    <el-row align="middle" type="flex">
      <el-col :span="12" :offset="6">
    <el-card shadow="always">
      <h2>Администрирования Диск.Датафорт</h2>
      <el-form
          class="login-form"
          :model="model"
          :rules="rules"
          ref="form"
          @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="model.email" placeholder="Почтовый адрес" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="model.password"
              placeholder="Пароль"
              type="password"
              prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              native-type="submit"
              block
          >Войти</el-button>
        </el-form-item>
      </el-form>
    </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      validCredentials: {
        email: "lightscope",
        password: "lightscope"
      },
      model: {
        email: "",
        password: ""
      },
      loading: false,
      rules: {
        email: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.$store.dispatch('LOGIN_USER', {email: this.model.email, password: this.model.password});
      this.loading = false;
      if (
          this.model.email === this.validCredentials.email &&
          this.model.password === this.validCredentials.password
      ) {
        this.$message.success("Вход выполнен");
      } else {
        this.$message.error("Почтовый адрес или пароль не верен");
      }
    }
  }
};
</script>

<style>
.Login{
  margin-top: 200px;
}
</style>