const https = require('https');
const http = require('http');

class RestAPI {
  constructor(host, bearerToken) {
    const separated = host.replace(/(:\/\/|:)/g, '#');
    const splitted = separated.split('#');

    if (splitted[0] === 'http') {
      this.request = http.request;

      if (!splitted[2]) splitted[2] = '80';
    } else this.request = https.request;

    this.baseOptions = {
      hostname: splitted[1],
      port: splitted[2] ? parseInt(splitted[2]) : 443,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      },
    };
  }

  setAuthorization(auth) {
    this.baseOptions.headers = {
      ...this.baseOptions.headers,
      Authorization: auth,
    };
  }

  setContentType(contentType) {
    this.baseOptions.headers = {
      ...this.baseOptions.headers,
      'Content-Type': contentType,
    };
  }

  get(endpoint) {
    const options = {
      ...this.baseOptions,
      path: endpoint,
      method: 'GET',
    };

    return this.alterRequest(options);
  }

  post(endpoint, body) {
    const options = {
      ...this.baseOptions,
      path: endpoint,
      method: 'POST',
    };

    return this.alterRequest(options, body);
  }

  patch(endpoint, body) {
    const options = {
      ...this.baseOptions,
      path: endpoint,
      method: 'PATCH',
    };

    return this.alterRequest(options, body);
  }

  put(endpoint, body) {
    const options = {
      ...this.baseOptions,
      path: endpoint,
      method: 'PUT',
    };

    return this.alterRequest(options, body);
  }

  delete(endpoint, body) {
    const options = {
      ...this.baseOptions,
      path: endpoint,
      method: 'DELETE',
    };

    return this.alterRequest(options, body);
  }

  async alterRequest(options, body) {
    try {
      const result = await new Promise((resolve, reject) => {
        const req = this.request(options, (response) => {
          const resCode = response.statusCode || 500;
          let data = '';

          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            const parsed = JSON.parse(data);

            if (resCode >= 400 && resCode < 600)
              reject({ code: resCode, data: parsed });
            else resolve(parsed);
          });
        });

        if (body && typeof body === 'string') req.write(body);
        else if (body) req.write(JSON.stringify(body));

        req.on('error', (error) => reject(error));
        req.end();
      });

      return result;
    } catch (err) {
      console.log(err, '<<< error');
    }
  }
}

module.exports = RestAPI;
