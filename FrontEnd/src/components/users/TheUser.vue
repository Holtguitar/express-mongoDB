<template>
  <h1><u>Users Managent</u></h1>
  <div v-for="user in state.users" :key="user.userId">
    <h3>{{ user.userName }}</h3>
  </div>
</template>

<script>
import userManagement from '../../modules/userManagement'
import { onMounted } from 'vue'

export default {
  setup() {
    const { editUser, state, GetAllUsers, user, userId } = userManagement()

    onMounted(() => {
      GetAllUsers()
    })

    return {
      user,
      userId,
      editUser,
      state,
    }
  },
}
</script>
