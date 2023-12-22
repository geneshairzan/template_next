const header = (handler) => async (r, res) => {
  console.log("header Middleware");

  let request_buffer = r;
  request_buffer.header = {
    ...request_buffer.header,
    "data-signature": "gip",
    xxx: 123,
    "Access-Control-Allow-Credentials": true,
  };

  console.log(request_buffer.header.xxx);

  // request_buffer.header["content-type"] = "application/json";
  // request_buffer.header["data-signature"] = "application/json";
  return handler(request_buffer, res);
};

export default header;
