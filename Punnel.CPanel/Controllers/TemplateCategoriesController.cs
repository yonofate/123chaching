using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Punnel.CPanel;

namespace Punnel.CPanel.Controllers
{
    public class TemplateCategoriesController : Controller
    {
        private PUNNELEntities db = new PUNNELEntities();

        // GET: TemplateCategories
        public async Task<ActionResult> Index()
        {
            return View(await db.TemplateCategories.Where(x=>x.Type==10).ToListAsync());
        }

        // GET: TemplateCategories/Details/5
        public async Task<ActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TemplateCategory templateCategory = await db.TemplateCategories.FindAsync(id);
            if (templateCategory == null)
            {
                return HttpNotFound();
            }
            return View(templateCategory);
        }

        // GET: TemplateCategories/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TemplateCategories/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,UserId,Name,Code,No,Type,Active,Description,CreatedBy,UpdatedBy,CreatedDate,UpdatedDate")] TemplateCategory templateCategory)
        {
            if (ModelState.IsValid)
            {
                templateCategory.Id = Guid.NewGuid();
                db.TemplateCategories.Add(templateCategory);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(templateCategory);
        }

        // GET: TemplateCategories/Edit/5
        public async Task<ActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TemplateCategory templateCategory = await db.TemplateCategories.FindAsync(id);
            if (templateCategory == null)
            {
                return HttpNotFound();
            }
            return View(templateCategory);
        }

        // POST: TemplateCategories/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,UserId,Name,Code,No,Type,Active,Description,CreatedBy,UpdatedBy,CreatedDate,UpdatedDate")] TemplateCategory templateCategory)
        {
            if (ModelState.IsValid)
            {
                db.Entry(templateCategory).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(templateCategory);
        }

        // GET: TemplateCategories/Delete/5
        public async Task<ActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TemplateCategory templateCategory = await db.TemplateCategories.FindAsync(id);
            if (templateCategory == null)
            {
                return HttpNotFound();
            }
            return View(templateCategory);
        }

        // POST: TemplateCategories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            TemplateCategory templateCategory = await db.TemplateCategories.FindAsync(id);
            db.TemplateCategories.Remove(templateCategory);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
