interface IAccountState {
    loading: boolean;
    users: User[] ;
  }
  
  interface User {
    dni: string;
    first_name: string;
    last_name: string;
    email: string;
  }
  
