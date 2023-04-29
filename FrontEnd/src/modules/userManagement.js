import {ref, computed} from 'vue'
import { useRoute, useRouter} from 'vue-router'

const getUsers = () => {

    const route = useRoute();
    const router = useRouter();

    const userId = computed(() => route.params.id);

    const state = ref({
        newUserName: '',
        newPassword: '',
        users: {}
    })

    const GetAllUsers = async () => {
        try {
            await fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then((data) => {
              state.value.users = data
            })
        } catch(err) {
            console.error(err)
            // alert(err)
        }
    }

    const newUser = () => { 
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            // "auth-token": state.token
          },
          body: JSON.stringify({
            userName: state.value.newUserName,
            password: state.value.newPassword
          }) 
        }
          fetch("http://localhost:3000/users/new", 
          requestOptions
        ).then(GetAllUsers())
    }

    const deleteUser = (_id) => {
        fetch("http://localhost:3000/users/delete/" + _id, { method: "DELETE"})
            .then(GetAllUsers())
    }

    const editUser = () => { 
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
            // "auth-token": state.token
          },
          body: JSON.stringify({
            userName: state.value.newUserName,
            password: state.value.newPassword
          }) 
        }
        fetch("http://localhost:3000/users/update/" + userId.value, 
        requestOptions)
          .then(res =>  res.body ) // redundant
          .then(res => {console.log(res)}) // redundant
          router.push('/users')
      }

    const user = ref({});
    const GetSpecificUser = async () => {
        try {
            fetch("http://localhost:3000/users" + _id)
            .then(res => res.json)
            .then(data => {
               user.value = data.filter(t => t._id === userId.value)
            })
        } catch(err) {
            // alert(err)
        }
    }

    return {
        state,
        GetAllUsers,
        newUser,
        deleteUser,
        editUser,
        user, 
        userId, 
        GetSpecificUser
    }
}

export default getUsers