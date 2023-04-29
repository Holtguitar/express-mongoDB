<template>
  <div>
    <h1>All Todos</h1>
    <button @click="newTodo()">New Todo</button>
    <input type="text" placeholder="author" v-model="state.newAuthor" />
    <input type="text" placeholder="todo" v-model="state.newTodoItem" />
    <div v-for="item in state.todos" :key="item.id">
      <RouterLink :to="`/todo/${item._id}`">
        <h1>{{ item.author }}</h1>
      </RouterLink>
      <p>{{ item.todo }}</p>
      <button @click="deleteTodo(item._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import todocrud from '../modules/todocrud'
import { onMounted } from 'vue'

export default {
  setup() {
    const { state, GetAllTodos, newTodo, deleteTodo, editTodo } = todocrud()
    onMounted(() => {
      GetAllTodos()
    })

    return { state, GetAllTodos, newTodo, deleteTodo, editTodo }
  },
}
</script>

<style>
p {
  color: white;
}
</style>
