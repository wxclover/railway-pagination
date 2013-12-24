exports.init = function (compound) {
    // add view helper
    compound.helpers.HelperSet.prototype.paginate = paginateHelper;
    // add orm method
    // sorry, jugglingdb only for now
    compound.orm.AbstractClass.paginate = paginateCollection;

    // global view helper
    function paginateHelper(collection ) {
        if (!collection.totalPages || collection.totalPages < 2) return '';
        var page = parseInt(collection.currentPage, 10);
        var pages = collection.totalPages;
        var html = '<div class="pagination">';
        var prevClass = 'prev' + (page === 1 ? ' disabled': '');
        var nextClass = 'next' + (page === pages ? ' disabled': '');
        html += '<ul><li class="' + prevClass + '">';
        if(page === 1)
            html += compound.helpers.link_to('Previous', 'javascript:;');
        else
            html += compound.helpers.link_to('Previous', '?page=' + (page - 1));
        html += '</li>';
        for (var i = 1; i <= pages; i++ ) {
            if (i == page) {
                html += '<li class="active"><a href="#">' + i + '</a></li>';
            } else {
                html += '<li>' + compound.helpers.link_to(i.toString(), '?page=' + i) + '</li>';
            }
        }
        html += '<li class="' + nextClass + '">';
        if(page === pages)
            html += compound.helpers.link_to('Next', 'javascript:;');
        else
            html += compound.helpers.link_to('Next', '?page=' + (page + 1));
        html += '</li></ul></div>';
        return html;
    };

    // orm method
    function paginateCollection(opts, callback) {
        var limit = opts.limit || 10;
        var page = opts.page || 1;
        var order   = opts.order ||'1';
        var where   = opts.where;
        var include = opts.include;
        var Model = this;

        Model.count(where,function (err, totalRecords) {
            Model.all({limit: limit, offset: (page - 1) * limit, order: order, where: where, include: include}, function (err, records) {
                if (err) return callback(err);
                records.totalRecords = totalRecords;
                records.currentPage = page;
                records.totalPages = Math.ceil(totalRecords / limit);
                callback(null, records);
            });
        });
    }

};
