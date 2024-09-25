import { BASELIST_URL, BASEUSER_URL } from '../constant'

let userData = {};
if(localStorage.getItem("UserData")){
    userData = JSON.parse(localStorage.getItem("Userdata"));
}


const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null) {
        result = true;
    }
    return result;
}



const createAccount = async (createduser) => 
{
    const result = await fetch(`${BASEUSER_URL}/AddUsers`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createduser)
    })
    if(!result.ok)
    {
        const message = `Error code = ${result.status}`;
        throw new Error(message);
    }
        let data = await result.json();
        console.log(data);
        
}

const login =  async (loginUser) => {
    const result = await fetch(`${BASEUSER_URL}/Login`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUser)
    })
    if(!result.ok)
    {
        const message = `Error code = ${result.status}`;
        throw new Error(message);
    }
        let data = await result.json();
        if(data.token != null){
            localStorage.setItem("Token",data.token);
        }
        console.log(data);
        return data;
}

    const GetLoggedInUser = async (username) =>
    {
       let result = await fetch(`${BASEUSER_URL}/GetUserByUsername/${username}`)
       userData = await result.json();
       console.log(userData);
       localStorage.setItem("UserData", JSON.stringify(userData));
       userData = JSON.parse(localStorage.getItem("UserData"));
    }

    const LoggedInData = () => {
        if(!userData && localStorage.getItem("UserData")){
            userData = JSON.parse(localStorage.getItem("UserData"));
        }
        return userData;
    }

    const AddExpenses = async (expenses) => {
        let result = await fetch (`${BASELIST_URL}/AddExpense`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenses)
        })
        if(!result.ok)
        {
            const message = `Error code = ${result.status}`;
            throw new Error(message);
        }
            let data = await result.json();
            console.log(data);
            return data;
    }

    const getExpenses = async () => {
        let result = await fetch(`${BASELIST_URL}/GetExpense`)
      let data = await result.json();
       console.log(data);
       return data;
    }

    const GetItemsByUserId = async (UserId) => {
        let result = await fetch(`${BASELIST_URL}/GetItemsByUserId/${UserId}`)
      let data = await result.json();
       console.log(data);
       return data;
    }

    
    const updateExpense = async (expenses) => {
        let result = await fetch (`${BASELIST_URL}/UpdateExpense`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenses)
        })
        if(!result.ok)
        {
            const message = `Error code = ${result.status}`;
            throw new Error(message);
        }
            let data = await result.json();
            console.log(data);
            return data;
    }

    const getPublishedExpenses = async () => {
        let result = await fetch(`${BASELIST_URL}/GetExpense`);
        let data = await result.json();
        return data;
    }

export {checkToken, createAccount, login, GetLoggedInUser, LoggedInData, AddExpenses, getExpenses, GetItemsByUserId, updateExpense, getPublishedExpenses}; 