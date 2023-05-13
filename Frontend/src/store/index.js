import {createStore} from 'vuex'
import {ref } from 'vue'

// const checkoff=ref(true)
// const checkin=ref(false)

export default createStore({
    state: {
        check: ref(true)
    },
    mutations: {
        setValue(state, newValue) {
          state.check = newValue;
        }
    },
})