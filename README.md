<!-- Goal is to Create FullStack web app for Blog Site -->
<!-- BackEnd will be done in .Net 8, web API, EF core, SQL Server -->
<!-- Front End will be done in React with JavaScript -->
<!-- Deploy with Azure Static web apps -->


<!-- Create an API for our Blog, This must handle all CRUD functions  -->

<!-- 
CRUD
Create
Read
Update
Delete
 -->

<!-- In this app the user should be able to login so we need login page -->

<!-- Create Account Page -->
<!-- Blog view post page of our published items -->
<!-- Dashboard Page (this is the profile page will edit delete, publish and unpublish your blog post) -->

<!-- SQL Server from Azure for our Database -->

<!-- Folder Structure -->

<!-- Controllers//Folders 
        UserController: This will handle all our user interactions
        All our endpoints will be in this controller for users

-->

<!-- Login//endpoint

        AddUser//endpoint
        UpdateUser//endpoint
        DeleteUser//endpoint

 -->


<!-- BlogController

        AddBlogItems//endpoint                  C
        GetAllBlogItems//endpoint               R
        GetAllBlogItemsByCategory//endpoint
        GetAllBlogItemsByTags//endpoint
        GetAllBlogItemsByDate//endpoint
        UpdateBlogItems//endpoint               U
        DeleteBlogItems//endpoint               D


 -->

 <!-----------------------------MODELS<!----------------------------->

 <!-- Model Folder -->

 <!-- UserModel
 
        Id int
        username string
        Salt string
        Hash string

  -->

  <!-- BlogItemModel 
  
        id int
        UserId int
        PublisherName string
        Title string
        Image string
        Description string
        Date string
        Category string
        IsPublished bool
        IsDeleted bool

  -->

  <!-------------------------------------------------Items that will be saved to our database are above------------------------------------------------->

<!-- LoginModel 
        Username string
        Password string
        CreateAccountModel
            Id int
            Username string
            password string
        PasswordModel
            Salt string
            Hash string
-->

<!-- Services//Folder

        UserService//file
            GetUserByUsername
            Login
            AddUser
            DeleteUser
        BlogItemService
            AddBlogItems
            GetAllBlogItemsByCategory//Functions(methods)
            GetAllBlogItemsByTag
            GetAllBlogItemsByDate
            UpdateBlogItems
            DeleteBlogItems
            GetUsersById

 -->

 <!-- PasswordServices//file
 
        Hash password

        Very hash password
  -->