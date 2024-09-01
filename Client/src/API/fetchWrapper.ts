export const wrapper = <T>(request: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    request
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data: T) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
