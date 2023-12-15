import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAccountState = {
    loading: false,
    users: [],
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        loadLocalUsers(state) {

            const localUsers = localStorage.getItem('users');
            if (localUsers) {
                state.users = JSON.parse(localUsers);
            }else {
                localStorage.setItem('users', JSON.stringify([]));
            }
        },
        addLocalUser(state, action: PayloadAction<User>) {
            const localUsers = localStorage.getItem('users');
            if (localUsers) {
                const users = JSON.parse(localUsers);

                users.push(action.payload);
                localStorage.setItem('users', JSON.stringify(users));
            }
            state.users?.push(action.payload);

        },
        removeLocalUser(state, action: PayloadAction<User>) {
            const localUsers = localStorage.getItem('users');
            const doc=action.payload.dni;
            console.log(doc);
            if (localUsers) {
                const users = JSON.parse(localUsers);
                console.log(users);
                const newUsers = users.filter((user: User) => user.dni !== doc);
                localStorage.setItem('users', JSON.stringify(newUsers));
            }
            if (state.users)
                state.users = state.users?.filter((user: User) => user.dni !== action.payload.dni);
        },
        updateLocalUser(state, action: PayloadAction<User>) {
            const localUsers = localStorage.getItem('users');
            if (localUsers) {
                const users = JSON.parse(localUsers);
                const newUsers = users.filter((user: User) => user.dni !== action.payload.dni);
                newUsers.push(action.payload);
                localStorage.setItem('users', JSON.stringify(newUsers));
            }
            if (state.users)
                state.users = state.users?.filter((user: User) => user.dni !== action.payload.dni);
        }
    },
});

export const {
    setLoading,
    addLocalUser,
    removeLocalUser,
    loadLocalUsers,
    updateLocalUser
} = userSlice.actions;

export default userSlice.reducer;
