
function Blog(data) {
    this.BlogId = ko.observable(data.BlogId);
    this.Name = ko.observable(data.Name);
    this.Url = ko.observable(data.Url);
}

function Post(data) {
    this.Title = ko.observable(data.Title);
    this.Content = ko.observable(data.Content);
    this.BlogId = ko.observable(data.BlogId);
}

function BlogViewModel() {
    var self = this;

    self.BlogId = ko.observable();
    self.Name = ko.observable().extend({ required: { message: "Please enter Name", params: true} });
    self.Url = ko.observable().extend({ required: { message: "Please enter URL", params: true }, number: true, min: 0, max: 100 });

    self.Blogs = ko.observableArray([]);

    self.blogErrors = ko.validation.group({ Name: self.Name, Url: self.Url });
    //self.validationModel = ko.validatedObservable({ Name: self.Name, Url: self.Url });
    
    self.AddBlog = function () {
        var isValid = true;
        if (self.blogErrors().length != 0) {
            self.blogErrors.showAllMessages();
            isValid = false;
        }

        //if (self.validationModel.isValid())
        if (isValid)  {
            var _blog = new Blog({
                BlogId: self.BlogId(),
                Name: self.Name(),
                Url: self.Url()
            });

            $.post("Blogging/Save", _blog, function (result) {
                self.Blogs.push(result);
            })

            self.BlogId("");
            self.Name("");
            self.Url("");
        }
//        else {
//            self.validationModel.showAllMessages(); 
//        }
    };

    self.RemoveBlog = function (blog) {
        if (confirm('Are you sure you want to delete this ' + blog.Name() + '?')) {
            $.post("Contact/Remove", blog, function (result) {
                $("#message").html(blog.Name() + ' Successfully removed.');
                $("#message").fadeIn(3000);
                $("#message").fadeOut(3000);
            })
            self.Blogs.remove(blog);
        }
    };

    self.EditBlog = function (blog) {
        self.BlogId(blog.BlogId());
        self.Name(blog.Name());
        self.Url(blog.Url());
    };

    $.post("Contact/GetBlogs", function (results) {
        var blogs = $.map(results, function (item) {
            return new Blog(item)
        });
        self.Blogs(blogs);
    })
}

ko.applyBindings(new BlogViewModel());
