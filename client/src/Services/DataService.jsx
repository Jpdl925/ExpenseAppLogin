import { BASELIST_URL } from '../constant'

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
    const result = await fetch('http://localhost:5228/api/User/AddUsers',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createduser)
    })
    if(!result.ok)
    {
        const message = `Yo you have an Error Check your code! ${result.status}`;
        throw new Error(message);
    }
        let data = await result.json();
        console.log(data);
        
}

const login =  async (loginUser) => {
    const result = await fetch('http://localhost:5228/api/User/Login',{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUser)
    })
    if(!result.ok)
    {
        const message = `Yo you have an Error Check your code! ${result.status}`;
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
       let result = await fetch(`http://localhost:5228/api/User/GetUserByUsername/${username}`)
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
            const message = `Yo you have an Error Check your code! ${result.status}`;
            throw new Error(message);
        }
            let data = await result.json();
            console.log(data);
            return data;
    }

    const sendData = async (controller, endpoint, passedInData) => {
        let result = await fetch (`http://localhost:5228/api/${controller}/${endpoint}`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passedInData)
        })
        if(!result.ok)
        {
            const message = `Yo you have an Error Check your code! ${result.status}`;
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
            const message = `Yo you have an Error Check your code! ${result.status}`;
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

export {checkToken, createAccount, login, GetLoggedInUser, LoggedInData, AddExpenses, sendData, getExpenses, GetItemsByUserId, updateExpense, getPublishedExpenses}; 