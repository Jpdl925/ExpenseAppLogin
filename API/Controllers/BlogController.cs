using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : ControllerBase
    {
        private readonly ListItemService _data;
        public ListController(ListItemService dataFromService)
        {
            _data = dataFromService;
        }


        [HttpPost("AddExpense")]
        public bool AddExpense(ListItemModel newExpense){
            return _data.AddListItem(newExpense);
        }

        [HttpGet("GetExpense")]
        public IEnumerable<ListItemModel> GetAllExpense(){
            return _data.GetAllList();
        }

        [HttpGet("GetExpenseByCategory/{Category}")]
        public IEnumerable<ListItemModel> GetExpenseByCategory(string Category){
            return _data.GetItemByCategory(Category);
        }

        [HttpPost("UpdateExpense")]
        public bool UpdateExpense(ListItemModel ExpenseUpdate){
            return _data.UpdateListItem(ExpenseUpdate);
        }

        [HttpPost("DeleteExpense/{ExpenseDelete}")]
        public bool DeleteExpense(ListItemModel ExpenseDelete){
            return _data.DeleteListItem(ExpenseDelete);
        }

        [HttpGet("GetPublishedItems")]
        public IEnumerable<ListItemModel> GetPublishedItems(){
            return _data.GetPublishedItems();
        }
        [HttpGet("GetItemsByUserId/{UserId}")]

        public IEnumerable<ListItemModel> GetItemsByUserId (int UserId){
            return _data.GetItemsByUserId(UserId);
        }
    }

}