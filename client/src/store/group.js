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
        async fetchBaseLineData({dispatch}, group) {
            try {
                const groupData = (await firebase.database().ref(`/baseline/${group.name}`).once('value')).val()
                return groupData
            } catch (e) {throw e}
        },
        async fetchUserGroupDublicate({dispatch}, groupName) {
            try {
                const uid = await dispatch('getUid')
                const group = (await firebase.database().ref(`/users/${uid}/groups/${groupName}`).once('value')).val()
                return group
            } catch (e) {throw e}
        },
        async trashUserGroup({dispatch}, group) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/groups/${group.name}`).remove()
            } catch (e) {throw e}
        },
        async createBaseLine({dispatch}, {name, bonds}) {
            try {
                await firebase.database().ref(`/baseline/${name}`).set({
                    name,
                    bonds
                })
            } catch (e) {throw e}
        },
        async fetchBaseLine({dispatch}) {
            try {
                const baseLines = (await firebase.database().ref(`/baseline/`).once('value')).val()
                return baseLines
            } catch (e) {throw e}
        },
        async fetchBaseLineDublicate({dispatch}, lineName) {
            try {
                const line = (await firebase.database().ref(`/baseline/${lineName}`).once('value')).val()
                return line
            } catch (e) {throw e}
        },
        async trashBaseLine({dispatch}, line) {
            try {
                await firebase.database().ref(`/baseline/${line.name}`).remove()
            } catch (e) {throw e}
        },
        async deleteUserBondOnList({dispatch}, {group}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/groups/${group.name}`).remove()
                await firebase.database().ref(`/users/${uid}/groups/${group.name}`).set({
                    'name': group.name,
                    'bonds': group.bonds
                })

            } catch (e) {throw e}
        },
        async deleteBaseBondOnList({dispatch}, {group}) {
            try {
                await firebase.database().ref(`/baseline/${group.name}`).remove()
                await firebase.database().ref(`/baseline/${group.name}`).set({
                    'name': group.name,
                    'bonds': group.bonds
                })
            } catch (e) {throw e}
        },
    }
}