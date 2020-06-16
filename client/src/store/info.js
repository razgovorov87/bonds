import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
           try {
            const uid = await dispatch('getUid')
            const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
            commit('setInfo', info)
           } catch (e) {}
        },
        async fetchUserList({dispatch}) {
            try {
                const userList = (await firebase.database().ref(`/users/`).once('value')).val()
                return Object.keys(userList).map(user => ({...userList[user], groups: userList[user].groups, id: user}))
            } catch (e) {}
        },
        async getUserRules({dispatch}, {item, rules}) {
            try {
                if( rules == 'admin') {
                    const user = (await firebase.database().ref(`/users/${item.id}/`).once('value')).val()
                    await firebase.database().ref(`/users/${item.id}/info/`).update({
                        isAdmin: !user.info.isAdmin
                    })
                }
            } catch (e) {throw e}
        },
        async userChangeTheme({dispatch}, dark) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).update({
                    defaultTheme: dark === true ? 'dark' : 'light'
                })
            } catch (e) {throw e}
        }
    },
    getters: {
        info: s => s.info
    }
}