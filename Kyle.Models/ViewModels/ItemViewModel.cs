using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyle.Models.ViewModels
{
    public class ItemViewModel<T> : BaseViewModel
    {
        public T Item { get; set; }
    }
}
