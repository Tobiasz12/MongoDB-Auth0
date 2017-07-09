var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var express = require('express');
var extend = require('xtend');
var forms = require('forms');
var ManagementClient = require('auth0').ManagementClient;
var User = require('./models');
var Address = require('./models');
var profileForm = forms.create({
    givenName: forms.fields.string({require:true}),
    nickName: forms.fields.string({require:true})
});

function renderForm(req, res, locals) {
    res.render('profile',extend({
        title: 'My Profile',
        csrfToken: req.csrfToken(),
        givenName: req.user.givenName,
        nickName: req.user.nickName,
    },locals || {}));
}

module.exports = function profile() {
    var router = express.Router();
    var address = new Address();
    var user = new User();
    router.use(cookieParser());
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(csurf({ cookie: true }));
    router.all('/', function(req, res){
    profileForm.handle(req, {
       success: function(form) {
            var management = new ManagementClient({
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qUTRRVGxDUXpnMk56RTBSVGMwTmpBeU1rTTBSalEzUmpBeFFqSkRRVEF6TkRGQlJEaEJPQSJ9.eyJpc3MiOiJodHRwczovL3RvYmk5NC5ldS5hdXRoMC5jb20vIiwic3ViIjoic0lUSXdrbFpzYWtQMFVyTjZIWHN4VkdLa0NpRGhLWTVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vdG9iaTk0LmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiZXhwIjoxNDk5NzA0MjM2LCJpYXQiOjE0OTk2MTc4MzYsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIn0.4Vb03gj8LBpIplF8OcYPUe1hedgbWU40hE7WKLwbzdG3lmVVlxUfAxo79ni-iAAYCvWkwTaEQJOo2Sx8RNFQonKHk0BVdYmKJYSGqisxW6jSm6RENrMRSYPANLfMeulgAeb9xF2Dn7ZgKbQNRfHS-98d0QEx0xLJ38H88P46TclpZXyWsYUPDRww5R26Nt6I57SD0CmlnmJzKN0bkwWnTQqzRptZQMt8mrGuuJwh13V9YqF_nutmbPT3tIz5EFiwr5SZRCStvPF1OBCZKVDO56eG1OzfHEoOilovjzbibBceY8ta88_q21frWuR7cHII2xnUOw_qHo9QIK_y_VNpig',
              domain: 'tobi94.eu.auth0.com'
            });
            address.givenName = req.user.givenName;
            address.nickName = req.user.nickName;
            address.save(function(err) {
                if (err) {
                    console.log(err);
                }
                res.json('Address added to DB');
            });
            req.user.givenName = form.data.givenName;
            req.user.nickName = form.data.nickName;
                management
                  .users
                  .updateUserMetadata({ id: req.user.id }, form.data)
             .then(function () {
                    renderForm(req, res);
                  });
           },
           empty: function() {
            renderForm(req, res);
           }
          });
         });
    return router;
};
