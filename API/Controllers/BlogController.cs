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
    public class BlogController : ControllerBase
    {
        private readonly BlogItemService _data;
        public BlogController(BlogItemService dataFromService)
        {
            _data = dataFromService;
        }


        [HttpPost("AddBlogItems")]
        public bool AddBlogItems(BlogItemModel newBlogItem){
            return _data.AddBlogItems(newBlogItem);
        }

        [HttpGet("GetBlogItem")]
        public IEnumerable<BlogItemModel> GetAllBlogItems(){
            return _data.GetAllBlogItems();
        }

        [HttpGet("GetBlogItemByCategory/{Category}")]
        public IEnumerable<BlogItemModel> GetItemByCategory(string Category){
            return _data.GetItemByCategory(Category);
        }

        [HttpGet("GetItemsByTag/{Tag}")]
        public List<BlogItemModel> GetItemByTag(string Tag){
            return _data.GetItemByTag(Tag);
        }

        [HttpGet("GetItemsByDate/{Date}")]
        public IEnumerable<BlogItemModel> GetItemByDate(string date){
            return _data.GetItemByDate(date);
        }

        [HttpPost("UpdateBlogItems")]
        public bool UpdateBlogItems(BlogItemModel BlogUpdate){
            return _data.UpdateBlogItems(BlogUpdate);
        }

        [HttpPost("DeleteBlogItem/{BlogDelete}")]
        public bool DeleteBlogItem(BlogItemModel BlogDelete){
            return _data.DeleteBlogItem(BlogDelete);
        }

        // GetPublishedBlogItems
        [HttpGet("GetPublishedItems")]
        public IEnumerable<BlogItemModel> GetPublishedItems(){
            return _data.GetPublishedItems();
        }
    }
}