import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity:0,
        total:0,
    },
    reducers: {
        addProduct: (state, action)=>{
            state.quantity += 1 // 아래 quantity 수량과 혼동X
            state.products.push(action.payload)
            state.total += action.payload.price *action.payload.quantity // 이건 - 와 + 사이 숫자임
        }
    }
})

export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;