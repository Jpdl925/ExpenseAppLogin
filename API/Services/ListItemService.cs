using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;

namespace API.Services
{
    public class ListItemService : ControllerBase
    {
        private readonly DataContext _context;

        public ListItemService(DataContext context)
        {
            _context = context;
        }

        public bool AddListItem(ListItemModel newListItem)
        {
            bool result = false;
            _context.Add(newListItem);
            result = _context.SaveChanges() != 0;
            return result;
        }
        public bool DeleteListItem(ListItemModel itemDelete)
        {
            _context.Update<ListItemModel>(itemDelete);
            return _context.SaveChanges() != 0;
        }
        public IEnumerable<ListItemModel> GetAllList()
        {
            return _context.ItemInfo;
        }

        public IEnumerable<ListItemModel> GetItemByCategory(string category)
        {
            return _context.ItemInfo.Where(item => item.Category == category);
        }


        public bool UpdateListItem(ListItemModel itemUpdate)
        {
            _context.Update<ListItemModel>(itemUpdate);
            return _context.SaveChanges() != 0;

        }

        public IEnumerable<ListItemModel> GetPublishedItems()
        {
            return _context.ItemInfo.Where(Item => Item.IsPublished);
        }

        public IEnumerable<ListItemModel> GetItemsByUserId(int userId)
        {
            return _context.ItemInfo.Where(item => item.UserId == userId && item.IsDeleted == false);
        }
    }
}