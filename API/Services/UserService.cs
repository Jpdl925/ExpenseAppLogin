using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.DTO;

namespace API.Services
{
    public class UserService
    {
        private readonly DataContext _context;
        public UserService(DataContext context){
            _context = context;
        }
        // Helper functions to help us check if the user exist
        // DoesUserExist
        public bool DoesUserExist (string username){
            // check oour tables to see if the user name exist
            // if one item matches our condition that item will be returned
            // if no items matches it will return null
            // if multiple items match it will return an error
        }
        public bool AddUser(CreateAccountDTO userToAdd)
        {
            // if the user already exist
            // if the user does not exist we add an account
            // else throw a false
        }
    }
}