
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
    self.Name = ko.observable();
    self.Url = ko.observable();

    self.Blogs = ko.observableArray([]);

    self.AddBlog = function () {

        var _blog = new Blog({
            BlogId: self.BlogId(),
            Name: self.Name(),
            Url: self.Url()
        });

        $.post("Contact/Save", _blog, function (result) {
            self.Blogs.push(result);
        })

        self.BlogId("");
        self.Name("");
        self.Url("");
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