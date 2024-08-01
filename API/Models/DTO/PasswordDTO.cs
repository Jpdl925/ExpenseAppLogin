using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTO
{
    public class PasswordDTO
    {
        public string? Salt { get; internal set; }
        public string? Hash { get; internal set; }
    }
}