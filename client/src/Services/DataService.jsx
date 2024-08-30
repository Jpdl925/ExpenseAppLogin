// This will hold our helper functions or method.
let userData = {};
if(localStorage.getItem("UserData")){
    userData = JSON.parse(localStorage.getItem("Userdata"));
}


// Helper Function to check our token.
const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null) {
        result = true;
    }
    return result;
}


// helper function or method to createAccount, async and await
// fetch() json(), stringify
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
            // localStorage.setItem("UserData",JSON.stringify(data.user)); // might need to comment this out
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

    // We need a function to help us add our blog items
    const AddBlogItems = async (blogItems) => {
        let result = await fetch ('http://localhost:5228/api/Blog/AddBlogItems',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blogItems)
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

    // Can we make a generic function to handle all of them
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

    // Function to help us get our blogItems
    const getBlogItems = async () => {
        let result = await fetch("http://localhost:5228/api/Blog/GetBlogItems")
      let data = await result.json();
       console.log(data);
       return data;
    }

    // Create a function to hit our GetItemsByUserId
    const GetItemsByUserId = async (UserId) => {
        let result = await fetch(`http://localhost:5228/api/Blog/GetItemsByUserId/${UserId}`)
      let data = await result.json();
       console.log(data);
       return data;
    }

export {checkToken, createAccount, login, GetLoggedInUser, LoggedInData, AddBlogItems, sendData, getBlogItems, GetItemsByUserId}; 