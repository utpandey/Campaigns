'use strict';

var routes = require('next-routes')();

routes.add('/campaigns/new', '/campaigns/new');
routes.add('/campaigns/:address', '/campaigns/show');
routes.add('/campaigns/:address/requests', '/campaigns/requests/index');
routes.add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFHQSxPQUFPLEFBQVAsSUFBVyxBQUFYLGtCQUE0QixBQUE1QjtBQUNBLE9BQU8sQUFBUCxJQUFXLEFBQVgsdUJBQWlDLEFBQWpDO0FBQ0EsT0FBTyxBQUFQLElBQVcsQUFBWCxnQ0FBMEMsQUFBMUM7QUFDQSxPQUFPLEFBQVAsSUFBVyxBQUFYLG9DQUE4QyxBQUE5Qzs7QUFHQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3V0c2F2cGFuZGV5OC9FTU9IL0NhbXBhaWduUHJvaiJ9