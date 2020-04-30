import firebase, { registerVersion } from 'firebase/app'

export default {
    actions: {
        async createUserGroup({dispatch}, {name, bonds}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/groups/${name}`).set({
                    name,
                    bonds
                })
            } catch (e) {throw e}
        },
        async fetchUserGroup({dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const groupList = (await firebase.database().ref(`/users/${uid}/groups`).once('value')).val()
                return groupList
            } catch (e) {throw e}
        },
        async fetchGroupData({dispatch}, group) {
            try {
                const uid = await dispatch('getUid')
                const groupData = (await firebase.database().ref(`/users/${uid}/groups/${group.name}`).once('value')).val()
                return groupData
            } catch (e) {throw e}
        },
        async deleteUserGroup({dispatch}, group) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/groups/${group.name}`).remove()
            } catch (e) {throw e}
        }
    }
}