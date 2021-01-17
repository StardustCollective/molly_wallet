const getDefaultState = () => {
    return {
        txHistory: [],
        txStatus: "Complete",
        txFinished: true
    }
}

const state = getDefaultState()

const actions = {
    reset({ commit }) {
        commit('resetState')
    }
}
const mutations = {
    resetState(state) {
        Object.assign(state, getDefaultState())
    },
    updateTxHistory(state, tx) {
        state.txHistory.unshift(tx)
    },
    updateFullTxHistory(state, obj) {
        let arr = obj.txHistoryFull || [];

        //GO-SIDE BUG: Year was not provided in persisted tx: Format("Jan _2 15:04:05")
        //  It's better not to sort and use as-is from GO
        //
        // arr.sort((a, b) => {
        //     return new Date(b.date) - new Date(a.date);
        // });

        state.txHistory = arr;
    },
    updateTxStatus(state, status) {
        state.txStatus = status
    },
    setTxFinished(state, setTxFinished) {
        state.txFinished = setTxFinished;
    }
}

export default {
    namespaced: true,
    state,
    getters: {},
    actions,
    mutations
}
