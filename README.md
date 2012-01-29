## About

Siple pagination plugin for RailwayJS MVC framework.

## Usage

Step 1. Plig-in: **npmfile.js**

```javascript
    require('railway-pagination');
```

Step 2. Controller: **posts_controller.js**

```javascript
    action(function index() {
       var page = req.param('page') || 1;
       Post.paginate({limit: 10, page: page}, function (err, posts) {
           if (err) render({posts: posts});
       });
    });
```

Step 3. View: **app/views/posts/index.ejs**

```javascript
    paginate(posts);
```

## License

MIT