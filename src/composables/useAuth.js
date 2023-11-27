import router from '@/router'
import { firebaseApp } from '@/composables/useFirebase'

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'  // <---- from had two spaces between "from" and 'firebase/auth'
import { useAuth as firebaseAuth } from '@vueuse/firebase/useAuth'

const auth = getAuth(firebaseApp)

const { isAuthenticated, user } = firebaseAuth(auth)   // <--- seperate all variables from the {} 

export const useAuth = () => {
  const login = async (username, password) => {
    await signInWithEmailAndPassword(auth, username, password)
    return isAuthenticated.value
  }

  const logout = async () => {
    await signOut(auth)
    router.push({ name: 'Home' })
  }
  return { isAuthenticated, user, login, logout }   // <--- seperate all variables from the {}
}