import io from 'socket.io-client'
import { writable } from 'svelte/store'
import { ID_KEY, SOCKET_ENDPOINT } from './utils/constants'

export const users = writable([])
export const loggedUser = writable()

export const socket = io("http://localhost:3000")

socket.on('user-disconnect', (leavingUser) => {
  console.log("Sdsda",socket);
  users.update((currentUsers) => {
    return currentUsers.filter((user) => user.id !== leavingUser.id)
  })
})
socket.on('user-join', (joinedUser) => {
  users.update((currentUsers) => [...currentUsers, joinedUser])
})

export function joinRoom(userProfile) {
  // const user = { email: name, password: roomID }
  // console.log(user)

  // fetch("http://localhost:3000/user/login", {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json' // Set the content type to JSON
  //     // You may need to include additional headers like authentication tokens if required by the API
  //   },
  //   body: JSON.stringify(user) // Convert the data object to a JSON string
  // })
  //   .then(response => {
      
  //     return response.json(); // Parse the response body as JSON
  //   })
  //   .then(data => {
  //     console.log('API response:', data);
  //     // Handle the API response here
  //   localStorage.setItem(ID_KEY, JSON.stringify(data))
    
  //   // socket.emit('joinRoom', data.id);
  //   window.location.reload()
  //   })
  //   .catch(error => {
  //     console.error('Error during fetch operation:', error);
  //   });
  let user = {
    token: localStorage.getItem('authToken'),
    email: userProfile.email,
    id: userProfile._id
  }
  localStorage.setItem(ID_KEY, JSON.stringify(user))

  // window.location.reload()
  
  socket.emit('join-room', user, (roomUsers, currentUser) => {
    console.log(user);
    const person = roomUsers.find(({ id }) => id === currentUser.id)
    person.isSelf = true
    users.set(roomUsers)
    loggedUser.set(user)
    localStorage.setItem(ID_KEY, JSON.stringify(user))
  })
}
// const saveUser = JSON.parse(localStorage.getItem(ID_KEY))
// if (saveUser) {
//   console.log(saveUser)
//   // joinRoom(saveUser.email, saveUser.room)
// }
