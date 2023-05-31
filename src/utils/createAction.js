/**
 * 함수를 리턴하는 함수
 * @param {string} type - action type
 * @returns {function} - action 객체를 리턴하는 함수
 */
export const createAction = (type) => {
  return (payload) => {
    return { type, payload };
  };
};
