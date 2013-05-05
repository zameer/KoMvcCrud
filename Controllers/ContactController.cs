using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blogging.Web.Models;


namespace Blogging.Web.Controllers
{
    public class ContactController : Controller
    {
        //
        // GET: /Contact/

        public ActionResult Index()
        {
            return View();
        }
        //
        // GET: /Contact/

        public JsonResult Save(Blog blog)
        {
            int blogid = blog.BlogId;
            BloggingContext db = new BloggingContext();
            Blog _blg = (from b in db.Blogs
                         where b.BlogId == blogid
                         select b).SingleOrDefault();

            if (_blg != null)
                _blg = blog;
            else
                db.Blogs.Add(blog);

            int ires = db.SaveChanges();

            return Json(blog, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Remove(Blog blog)
        {
            int blogid = blog.BlogId;
            BloggingContext db = new BloggingContext();
            Blog _blg = (from b in db.Blogs
                       where b.BlogId == blogid
                       select b).SingleOrDefault();
            db.Blogs.Remove(_blg);
            int ires = db.SaveChanges();
            string res = "Remove Success";
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBlogs()
        {
            BloggingContext db = new BloggingContext();
            var _blogs = from s in db.Blogs
                        select s;
            return Json(_blogs, JsonRequestBehavior.AllowGet);
        }
    }
}
