import firebase, { registerVersion } from 'firebase/app'

export default {
    actions: {
        async saveFilterData({dispatch}, filterData) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/filter/`).set(filterData)
            } catch (e) {throw e}
        },
        async fetchFilterData({dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const filterData = (await firebase.database().ref(`/users/${uid}/filter`).once('value')).val()
                return filterData
            } catch (e) {throw e}
        }
    }
}