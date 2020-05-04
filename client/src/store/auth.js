import firebase, { registerVersion } from 'firebase/app'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
               await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                throw e
            }
        },
        async register({dispatch, commit}, {name, email, password}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    avatar: '',
                    isAdmin: 0,
                    name,
                    email
                })
             } catch (e) {
                 throw e
             }
        },
        getUid({dispatch}) {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout({commit}) {
            await firebase.auth().signOut()
            await commit('clearInfo')
        }
    }
}