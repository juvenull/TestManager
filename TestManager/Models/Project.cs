using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestManager.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string AvatarUrl { get; set; }
    }
}
