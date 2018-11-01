// 路由分发

function requestHandler(req, res) {
  switch(req.method) {
    case 'POST':
      update(req, res);
      break;
    case 'DELETE': 
      remove(req, res);
      break;
    case 'PUT':
      create(req, res);
      break;
    default:
      get(req, res);
  }
}

// 业务逻辑分发

function update(req, res) {
  // code ...
}

function remove(req, res) {
  // code ...
}

function create(req, res) {
  // code ...
}

function get(req, res) {
  // code ...
}